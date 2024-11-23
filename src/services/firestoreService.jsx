import { auth } from "@/lib/firebase";
import { getIdTokenResult } from "firebase/auth";
import { Navigate } from "react-router-dom";

// In verifyAuth and verifyAdmin
const verifyAuth = async () => {
  const user = auth.currentUser;
  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  try {
    const tokenResult = await getIdTokenResult(user);
    if (tokenResult.expirationTime < Date.now()) {
      // Token has expired, force refresh
      await user.getIdToken(true);
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return <Navigate to="/login" />;
  }

  return true;
};
const verifyAdmin = async () => {
  const user = auth.currentUser;
  if (!user) {
    return <Navigate to="/login" />;
  }

  try {
    const tokenResult = await getIdTokenResult(user);
    if (tokenResult.claims.admin !== true) {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("Admin verification failed:", error);
    return <Navigate to="/" />;
  }

  return true;
};

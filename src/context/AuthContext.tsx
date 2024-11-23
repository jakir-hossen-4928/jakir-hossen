import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface AuthContextType {
  user: any;
  isAdmin: boolean;
  token: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      setIsLoading(true);
      if (authUser) {
        const userRef = doc(db, "users", authUser.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          await setDoc(userRef, {
            displayName: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
            isAdmin: false,
            createdAt: serverTimestamp(),
          });
        }

        const userData = userDoc.data() || {};
        setUser({ ...authUser, ...userData });
        setIsAdmin(userData.isAdmin || false);

        const token = await authUser.getIdToken();
        setToken(token);
      } else {
        setUser(null);
        setIsAdmin(false);
        setToken(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const authUser = result.user;

      const userRef = doc(db, "users", authUser.uid);
      await setDoc(
        userRef,
        {
          displayName: authUser.displayName,
          email: authUser.email,
          photoURL: authUser.photoURL,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, token, signInWithGoogle, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

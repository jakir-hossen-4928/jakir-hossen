import { createContext, useContext, useEffect, useState } from "react";
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User,
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
import { doc, setDoc, getDoc, collection, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: any) => Promise<void>;
  deleteUserAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setIsAdmin(userDoc.data()?.isAdmin || false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveUserToFirestore = async (user: User) => {
    const userRef = doc(db, "users", user.uid);
    const userData = {
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      isAdmin: user.email === "mdjakirkhan4928@gmail.com",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      uid: user.uid,
    };

    try {
      await setDoc(userRef, userData, { merge: true });
    } catch (error) {
      console.error("Error saving user data:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await saveUserToFirestore(result.user);
      toast.success("Successfully signed in with Google!");
    } catch (error) {
      toast.error("Failed to sign in with Google");
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await saveUserToFirestore(result.user);
      toast.success("Successfully signed in with Facebook!");
    } catch (error) {
      toast.error("Failed to sign in with Facebook");
      throw error;
    }
  };

  const updateUserProfile = async (data: any) => {
    if (!user) throw new Error("No user logged in");
    
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      throw error;
    }
  };

  const deleteUserAccount = async () => {
    if (!user) throw new Error("No user logged in");
    
    try {
      await deleteDoc(doc(db, "users", user.uid));
      await user.delete();
      toast.success("Account deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete account");
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          lastLogout: new Date().toISOString()
        });
      }
      await signOut(auth);
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error("Failed to log out");
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAdmin,
      signInWithGoogle, 
      signInWithFacebook, 
      logout,
      updateUserProfile,
      deleteUserAccount
    }}>
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
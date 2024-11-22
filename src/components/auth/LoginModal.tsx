import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { signInWithGoogle, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    const redirectPath = isAdmin ? "/admin" : "/user";
    navigate(redirectPath);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Login</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 p-6">
          <Button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black hover:bg-gray-100 h-auto py-4"
          >
            <div className="flex flex-col items-center w-full mx-3 space-y-2">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-8 h-8" />
              <span className="text-sm font-medium">Sign in with Google</span>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
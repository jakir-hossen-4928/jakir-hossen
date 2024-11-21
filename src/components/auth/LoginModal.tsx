import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Github } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { signInWithGoogle, signInWithFacebook } = useAuth();

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    onClose();
  };

  const handleFacebookLogin = async () => {
    await signInWithFacebook();
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
            className="w-full bg-white text-black hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </Button>
          <Button
            onClick={handleFacebookLogin}
            className="w-full bg-[#1877f2] hover:bg-[#1865d3] flex items-center justify-center gap-2"
          >
            <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
            Sign in with Facebook
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
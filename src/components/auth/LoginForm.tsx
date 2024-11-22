import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    navigate("/dashboard");
  };

  return (
    <div className="space-y-4 w-full max-w-sm">
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
  );
};
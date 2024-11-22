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
        className="w-full bg-white text-black hover:bg-gray-100"
      >
        <div className="flex flex-col items-center w-full mx-3">
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6 mb-2" />
          <span className="text-sm">Sign in with Google</span>
        </div>
      </Button>
    </div>
  );
};
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { signInWithGoogle, signInWithFacebook } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    navigate("/dashboard");
  };

  const handleFacebookLogin = async () => {
    await signInWithFacebook();
    navigate("/dashboard");
  };

  return (
    <div className="space-y-4 w-full max-w-sm">
      <Button
        onClick={handleGoogleLogin}
        className="w-full bg-white text-black hover:bg-gray-100"
      >
        Sign in with Google
      </Button>
      <Button
        onClick={handleFacebookLogin}
        className="w-full bg-[#1877f2] hover:bg-[#1865d3]"
      >
        Sign in with Facebook
      </Button>
    </div>
  );
};
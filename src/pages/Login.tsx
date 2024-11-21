import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Login to Dashboard</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
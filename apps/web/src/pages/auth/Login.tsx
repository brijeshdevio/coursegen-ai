import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function Login() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to access your courses."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}

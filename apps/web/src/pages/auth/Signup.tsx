import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { SignupForm } from "@/features/auth/components/SignupForm";

export default function Signup() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start generating courses for free."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthLayout>
  );
}

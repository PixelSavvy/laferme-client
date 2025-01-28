import { AuthLayout } from "@/components/layout";
import { LoginForm } from "@/features/auth";

const LoginRoute = () => {
  return (
    <AuthLayout title="ავტორიზაცია">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginRoute;

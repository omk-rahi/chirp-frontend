import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

import Checkbox from "../../../components/Checkbox";
import HyperLink from "../../../components/HyperLink";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useLogin } from "../hooks/useAuth";

const loginSchema = z
  .object({
    usernameOrEmail: z.string("Please enter username or email address"),
    password: z.string("Please enter a valid password"),
    rememberMe: z.boolean().optional(),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { login, isLoading } = useLogin();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="flex min-h-screen">
      <div className="bg-brand-500 flex-1 min-h-screen hidden lg:flex items-center justify-center">
        <div className="hidden lg:flex justify-center items-center flex-col">
          <img
            src="images/logo-white.svg"
            alt="Brand Logo"
            className="w-24 h-24"
          />
          <p className="text-white font-medium text-lg mt-2">
            Log In & Let the Chats Fly!
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-1 flex-col">
        <div className="max-w-md w-full px-8 lg:mx-auto space-y-6">
          <div className="lg:hidden">
            <img src="images/logo.svg" alt="Brand Logo" className="w-16 h-16" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              or&nbsp;
              <Link to="/register">
                <HyperLink>create a new account</HyperLink>
              </Link>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <Input
              label="Username or Email Address"
              id="usernameOrEmail"
              type="text"
              register={register}
              error={errors?.usernameOrEmail}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              register={register}
              error={errors?.password}
            />

            <div className="flex items-center justify-between">
              <Checkbox
                label="Remember me"
                id="rememberMe"
                register={register}
              />
              <HyperLink href="#">Forgot Password ?</HyperLink>
            </div>

            <Button type="submit" disabled={isLoading}>
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

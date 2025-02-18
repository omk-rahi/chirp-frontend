import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

import Checkbox from "../../../components/Checkbox";
import HyperLink from "../../../components/HyperLink";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useRegister } from "../hooks/useAuth";

const registerSchema = z
  .object({
    fullName: z.string().min(1, "Please enter your name"),
    email: z.string().email("Please enter a valid email address"),
    username: z.string().min(4, "Username must be at least 4 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  })
  .required();

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const { register: createUser, isLoading } = useRegister();

  const onSubmit = (data) => {
    createUser(data);
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
            Let&apos;s Get You Chirping!
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
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?&nbsp;
              <Link to="/login">
                <HyperLink>Sign in</HyperLink>
              </Link>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <Input
              label="Fullname"
              id="fullName"
              type="text"
              register={register}
              error={errors?.fullName}
            />
            <Input
              label="Username"
              id="username"
              type="text"
              register={register}
              error={errors?.username}
            />
            <Input
              label="Email Address"
              id="email"
              type="email"
              register={register}
              error={errors?.email}
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
                label="I agree to the Terms and Privacy Policy"
                register={register}
                checked={true}
                id="terms"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

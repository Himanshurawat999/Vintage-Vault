import { useForm, type SubmitHandler } from "react-hook-form";
import { resetSchema, type resetInput } from "../../types/registration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LucideEye, LucideEyeClosed } from "lucide-react";
import { useResetPassword } from "../../hooks/useResetPassword";
import { Link, useSearchParams } from "react-router";
import LoadingButton from "../../components/animata/LoadingButton";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useResetPassword();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  console.log(token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetInput>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "", token },
  });

  const onSubmit: SubmitHandler<resetInput> = (data: resetInput) => {
    console.log("Validated Data:", data);
    if (token) mutate({ ...data, token: token });
  };

  const handleClick = () => {
    setShowPassword((p) => !p);
  };

  return (
    <div className="w-[90%] lg:w-[80%] h-[90vh] mx-auto flex pt-8 rounded-sm overflow-hidden">
      <div id="left" className="hidden md:block md:w-1/2 h-full">
        <img src="/Images/login.jpg" alt="img" className="w-full h-full object-cover" />
      </div>
      <div id="right" className="w-full md:w-1/2 h-full px-4 py-4 lg:px-8 lg:py-6 lg:pl-14 bg-gray-50">
        <h1 className="font-fraunces text-2xl lg:text-4xl text-zinc-900 mb-2">
          Reset your Password
        </h1>
        <p className="text-xs lg:text-sm text-zinc-600 mb-4">
          Register now to immerse yourself in refined fashion experiences—where
          sophistication, exclusivity, and craftsmanship converge.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit, (errors) =>
            console.log("Errors:", errors)
          )}
          className="w-full"
        >
          <fieldset className="custom-fieldset">
            <legend>Password</legend>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••"
              className={`${
                errors.password ? "custom-input-error" : "custom-input"
              }`}
            />
            {showPassword ? (
              <LucideEye
                onClick={handleClick}
                className="absolute right-12 top-3 text-xl text-zinc-800 cursor-pointer"
              />
            ) : (
              <LucideEyeClosed
                onClick={handleClick}
                className="absolute right-12 top-3 text-xl text-zinc-800 cursor-pointer"
              />
            )}
            {errors.password && (
              <p className="custom-error">{errors.password.message}</p>
            )}
          </fieldset>

          <fieldset className="custom-fieldset">
            <legend>Confirm Password</legend>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••"
              className={
                errors.confirmPassword ? "custom-input-error" : "custom-input"
              }
            />
            {errors.confirmPassword && (
              <p className="custom-error">{errors.confirmPassword.message}</p>
            )}
          </fieldset>

          <LoadingButton
            isPending={isPending}
            type="submit" 
            text="Reset"
          />
        </form>

        <p className="text-sm text-zinc-600 absolute bottom-1 right-4">
          Not a member yet??{" "}
          <Link
            to={"/register"}
            className="font-semibold underline text-zinc-900 cursor-pointer"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;

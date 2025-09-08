import { useForm, type SubmitHandler } from "react-hook-form";
import {
  forgetSchema,
  type forgetInput,
} from "../../types/registration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { useForgetPassword } from "../../hooks/useForgetPassword";
import LoadingButton from "../../components/animata/LoadingButton";

const ForgetPassword = () => {
  const { mutate, isPending } = useForgetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgetInput>({
    resolver: zodResolver(forgetSchema),
  });

  const onSubmit: SubmitHandler<forgetInput> = (data: forgetInput) => {
    console.log("Validated Data:", data);
    mutate(data);
  };

  return (
    <div className="w-[90%] lg:w-[80%] h-[90vh] mx-auto flex pt-8 rounded-sm overflow-hidden">
      <div id="left" className="hidden md:block md:w-1/2 h-full">
        <img src="/Images/login.jpg" alt="img" className="w-full h-full object-cover" />
      </div>
      <div id="right" className="w-full md:w-1/2 h-full px-4 py-4 lg:px-8 lg:py-6 lg:pl-14 bg-gray-50">
        <h1 className="font-fraunces text-2xl lg:text-4xl text-zinc-900 mb-2">
          Forgot your password
        </h1>
        <p className="text-xs lg:text-sm text-zinc-600 mb-4">
          Enter your email address and we will send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <fieldset className="custom-fieldset">
            <legend>Email</legend>
            <input
              {...register("email")}
              placeholder="john@gmail.com"
              className={`${
                errors.email ? "custom-input-error" : "custom-input"
              }`}
            />
            {errors.email && (
              <p className="custom-error">{errors.email.message}</p>
            )}
          </fieldset>

          <LoadingButton
            isPending={isPending}
            type="submit" 
            text="Submit"
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

export default ForgetPassword;

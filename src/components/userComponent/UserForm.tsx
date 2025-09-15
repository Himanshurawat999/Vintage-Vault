import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../../components/animata/LoadingButton";
import { userFormSchema, type userFormInput } from "../../types/user.schema";
import { useUserForm } from "../../hooks/userHooks/useUserForm";

interface Props {
  onSuccess: () => void;
}

const UserForm: React.FC<Props> = ({ onSuccess }) => {
  const {mutate:userForm} = useUserForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<userFormInput>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = (data: userFormInput) => {
    userForm({payload: data})
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
      <fieldset className="custom-fieldset">
        <legend>First Name</legend>
        <input
          type="text"
          {...register("firstName")}
          placeholder="Enter your first name"
          className={`${errors.firstName ? "custom-input-error" : "custom-input"}`}
        />
        {errors.firstName && <p className="custom-error">{errors.firstName.message}</p>}
      </fieldset>

      <fieldset className="custom-fieldset">
        <legend>Last Name</legend>
        <input
          type="text"
          {...register("lastName")}
          placeholder="Enter your last name"
          className={`${errors.lastName ? "custom-input-error" : "custom-input"}`}
        />
        {errors.lastName && <p className="custom-error">{errors.lastName.message}</p>}
      </fieldset>

      <fieldset className="custom-fieldset">
        <legend>Email Address</legend>
        <input
          type="email"
          {...register("email")}
          placeholder="Enter your email"
          className={`${errors.email ? "custom-input-error" : "custom-input"}`}
        />
        {errors.email && <p className="custom-error">{errors.email.message}</p>}
      </fieldset>

      <LoadingButton isPending={isSubmitting} type="submit" text="Update" />
    </form>
  );
};

export default UserForm;

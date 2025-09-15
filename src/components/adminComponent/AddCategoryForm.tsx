import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategorySchema, type AddCategoryFormValues } from "../../types/categories.schema";
import LoadingButton from "../../components/animata/LoadingButton";
import { useAddCategory } from "../../hooks/adminHooks/useAddCategory";

const AddCategoryForm = () => {
    const {mutate} = useAddCategory();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddCategoryFormValues>({
    resolver: zodResolver(addCategorySchema),
  });

  const onSubmit = (data: AddCategoryFormValues) => {
    console.log("Submitting:", data);
    mutate(data)
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <fieldset className="custom-fieldset">
          <legend>Category Name</legend>
          <input
            {...register("name")}
            placeholder="Enter category name"
            className={`${errors.name ? "custom-input-error" : "custom-input"}`}
          />
          {errors.name && <p className="custom-error">{errors.name.message}</p>}
        </fieldset>

        <fieldset className="custom-fieldset">
          <legend>Description</legend>
          <textarea
            {...register("description")}
            placeholder="Enter category description"
            className={`${
              errors.description ? "custom-input-error" : "custom-input"
            }`}
          />
          {errors.description && (
            <p className="custom-error">{errors.description.message}</p>
          )}
        </fieldset>

        <fieldset className="custom-fieldset">
          <legend>Status</legend>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                {...register("isActive")}
                type="checkbox"
                className="checkbox"
              />
              <span>Active</span>
            </label>
          </div>
          {errors.isActive && (
            <p className="custom-error">{errors.isActive.message}</p>
          )}
        </fieldset>

        <LoadingButton
          isPending={isSubmitting}
          type="submit"
          text="Create Category"
        />
      </form>
    </div>
  );
};

export default AddCategoryForm;

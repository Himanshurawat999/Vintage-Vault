import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addCategorySchema,
  type AddCategoryFormValues,
} from "../../types/categories.schema";
import LoadingButton from "../../components/animata/LoadingButton";
import { useEditCategory } from "../../hooks/adminHooks/useEditCategory";
import { useSearchParams } from "react-router";
import { useCategories } from "../../hooks/userHooks/useCategories";
import { useEffect } from "react";
import LoadingScreen from "../userComponent/LoadingScreen";

const EditCategory = ({ onSuccess, status }: { onSuccess: () => void, status:string }) => {
  const { mutate } = useEditCategory();
  const { data: categoriesData, isLoading: categoriesDataLoading } = useCategories(status);
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log(id)
  console.log(categoriesData)
  const category = categoriesData?.data?.categories?.find(
    (category: any) => category.id === id
  );

  console.log("searchParams", searchParams.get("id"));
  // console.log(category);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddCategoryFormValues>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: false,
    },
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category?.name,
        description: category?.description,
        isActive: category?.isActive,
      });
    }
  }, [category, reset]);

  const onSubmit = (data: AddCategoryFormValues) => {
    console.log("Submitting:", data);
    id && mutate({ id, payload: data });
    onSuccess();
  };

  return (
    categoriesDataLoading ? (<LoadingScreen />) : (
      <div className="mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <fieldset className="custom-fieldset">
            <legend>Category Name</legend>
            <input
              {...register("name")}
              placeholder="Enter category name"
              className={`${
                errors.name ? "custom-input-error" : "custom-input"
              }`}
            />
            {errors.name && (
              <p className="custom-error">{errors.name.message}</p>
            )}
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
            text="Edit Category"
          />
        </form>
      </div>
    )
  );
};

export default EditCategory;

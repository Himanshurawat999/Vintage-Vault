import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  type AddProductFormValues,
} from "../../types/product.schema";
import LoadingButton from "../../components/animata/LoadingButton";
import { useAddProduct } from "../../hooks/adminHooks/useAddProduct";

const AddProductForm = () => {
  const { mutate } = useAddProduct();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: AddProductFormValues) => {
    console.log("Submitting product:", data);
    mutate(data);
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Product Name */}
        <fieldset className="custom-fieldset">
          <legend>Product Name</legend>
          <input
            {...register("name")}
            placeholder="Enter product name"
            className={`${errors.name ? "custom-input-error" : "custom-input"}`}
          />
          {errors.name && <p className="custom-error">{errors.name.message}</p>}
        </fieldset>

        {/* Description */}
        <fieldset className="custom-fieldset">
          <legend>Description</legend>
          <textarea
            {...register("description")}
            placeholder="Enter product description"
            className={`${
              errors.description ? "custom-input-error" : "custom-input"
            }`}
          />
          {errors.description && (
            <p className="custom-error">{errors.description.message}</p>
          )}
        </fieldset>

        {/* Price */}
        <fieldset className="custom-fieldset">
          <legend>Price</legend>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            placeholder="Enter price"
            className={`${
              errors.price ? "custom-input-error" : "custom-input"
            }`}
          />
          {errors.price && (
            <p className="custom-error">{errors.price.message}</p>
          )}
        </fieldset>

        {/* Weight */}
        <fieldset className="custom-fieldset">
          <legend>Weight</legend>
          <input
            type="number"
            step="0.001"
            {...register("weight")}
            placeholder="Enter weight"
            className={`${
              errors.weight ? "custom-input-error" : "custom-input"
            }`}
          />
          {errors.weight && (
            <p className="custom-error">{errors.weight.message}</p>
          )}
        </fieldset>

        {/* Weight Unit */}
        <fieldset className="custom-fieldset">
          <legend>Weight Unit</legend>
          <select
            {...register("weightUnit")}
            className={`${
              errors.weightUnit ? "custom-input-error" : "custom-input"
            }`}
          >
            <option value="">Select unit</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="lb">Pounds (lb)</option>
            <option value="oz">Ounces (oz)</option>
          </select>
          {errors.weightUnit && (
            <p className="custom-error">{errors.weightUnit.message}</p>
          )}
        </fieldset>

        {/* status */}
        <fieldset className="custom-fieldset">
          <legend>Status</legend>
          <select
            {...register("status")}
            className={`${
              errors.status ? "custom-input-error" : "custom-input"
            }`}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
            <option value="discountinued">Discountinued</option>
          </select>
          {errors.weightUnit && (
            <p className="custom-error">{errors.weightUnit.message}</p>
          )}
        </fieldset>

        {/* Inventory Quantity */}
        <fieldset className="custom-fieldset">
          <legend>Inventory Quantity</legend>
          <input
            type="number"
            {...register("inventoryQuantity")}
            placeholder="Enter inventory quantity"
            className={`${
              errors.inventoryQuantity ? "custom-input-error" : "custom-input"
            }`}
          />
          {errors.inventoryQuantity && (
            <p className="custom-error">{errors.inventoryQuantity.message}</p>
          )}
        </fieldset>

        {/* Allow Backorder */}
        <fieldset className="custom-fieldset">
          <legend>Allow Backorder</legend>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox" {...register("allowBackorder")} />
            <span>Allow Backorder</span>
          </label>
          {errors.allowBackorder && (
            <p className="custom-error">{errors.allowBackorder.message}</p>
          )}
        </fieldset>

        {/* Category ID */}
        <fieldset className="custom-fieldset">
          <legend>Category ID</legend>
          <input
            type="text"
            {...register("categoryId")}
            placeholder="Enter category UUID"
            className={`${
              errors.categoryId ? "custom-input-error" : "custom-input"
            }`}
          />
          {errors.categoryId && (
            <p className="custom-error">{errors.categoryId.message}</p>
          )}
        </fieldset>

        {/* Tags */}
        <fieldset className="custom-fieldset">
          <legend>Tags (comma separated)</legend>
          <input
            type="text"
            {...register("tags")}
            placeholder="e.g., smartphone, electronics"
            className={`${errors.tags ? "custom-input-error" : "custom-input"}`}
          />
          {errors.tags && <p className="custom-error">{errors.tags.message}</p>}
        </fieldset>

        {/* Images */}
        <fieldset className="custom-fieldset">
          <legend>Image URLs (comma separated)</legend>
          <input
            type="text"
            {...register("images")}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            className={`${
              errors.images ? "custom-input-error" : "custom-input"
            }`}
          />
          {errors.images && (
            <p className="custom-error">{errors.images.message}</p>
          )}
        </fieldset>

        {/* Submit Button */}
        <LoadingButton
          isPending={isSubmitting}
          type="submit"
          text="Add Product"
        />
      </form>
    </div>
  );
};

export default AddProductForm;

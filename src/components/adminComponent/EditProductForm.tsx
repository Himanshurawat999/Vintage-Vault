import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../../components/animata/LoadingButton";
import { useEditProduct } from "../../hooks/adminHooks/useEditProduct";
import {
  productSchema,
  type AddProductFormValues,
} from "../../types/product.schema";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { useProductsData } from "../../hooks/userHooks/useProductsData";

const EditProductForm = () => {
  const { mutate } = useEditProduct();
  const { data: productsData, isLoading } = useProductsData();
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const product = productsData?.data?.products?.find(
    (product: any) => product.id === id
  );

  console.log("searchParams id:", id);
  // console.log(product);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      weight: "",
      weightUnit: "kg",
      status: "active",
      inventoryQuantity: 0,
      allowBackorder: false,
      categoryId: "",
      tags: [],
      images: [],
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        weight: product.weight,
        weightUnit: product.weightUnit,
        status: product.status,
        inventoryQuantity: product.inventoryQuantity,
        allowBackorder: product.allowBackorder,
        categoryId: product.categoryId,
        tags: product.tags,
        images: [],
      });
    }
  }, [product, reset]);

  const onSubmit = (data: AddProductFormValues) => {
    console.log("Hello");
    console.log("Submitting edited product:", data);
    id && mutate({ id, payload: data });
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const handleImage = (e, field) => {
    const files = e.target.files;
    field.onChange(files ? Array.from(files) : []);
    console.log(files)
  }

  return (
    !isLoading && (
      <div className="mb-4">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
          {/* Name */}
          <fieldset className="custom-fieldset">
            <legend>Product Name</legend>
            <input
              {...register("name")}
              placeholder="Enter product name"
              className={`${
                errors.name ? "custom-input-error" : "custom-input"
              }`}
            />
            {errors.name && (
              <p className="custom-error">{errors.name.message}</p>
            )}
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
              {...register("inventoryQuantity", { valueAsNumber: true })}
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
              <input
                type="checkbox"
                className="checkbox"
                {...register("allowBackorder")}
              />
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
              placeholder="e.g., smartphone, apple"
              className={`${
                errors.tags ? "custom-input-error" : "custom-input"
              }`}
            />
            {errors.tags && (
              <p className="custom-error">{errors.tags.message}</p>
            )}
          </fieldset>

          {/* Images */}
          {/* <fieldset className="custom-fieldset">
            <legend>Image</legend>
            <input
              type="file"
              multiple
              {...register("images")}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              className="file-input"
              style={{borderStyle: "hidden"}}
              // className={`${errors.images ? "custom-input-error" : "custom-input"}`}
            />
            {errors.images && <p className="custom-error">{errors.images.message}</p>}
          </fieldset> */}

          <fieldset className="custom-fieldset">
            <legend>Image</legend>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  multiple
                  className="file-input"
                  onChange={(e) => handleImage(e,field)}
                />
              )}
            />
            {errors.images && (
              <p className="custom-error">{errors.images.message}</p>
            )}
          </fieldset>

          {/* Submit */}
          <LoadingButton
            isPending={isSubmitting}
            type="submit"
            text="Edit Product"
          />
        </form>
      </div>
    )
  );
};

export default EditProductForm;

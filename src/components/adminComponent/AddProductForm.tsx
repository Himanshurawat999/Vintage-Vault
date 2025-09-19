import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../../components/animata/LoadingButton";
import { ImageOff, X } from "lucide-react";
import {
  productSchema,
  type AddProductFormValues,
} from "../../types/product.schema";
import { useAddProduct } from "../../hooks/adminHooks/useAddProduct";
import { useUploadImages } from "../../hooks/adminHooks/useUploadImages";
import { useCategories } from "../../hooks/userHooks/useCategories";

const AddProductForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate: addProduct } = useAddProduct();
  const { mutateAsync: uploadImages } = useUploadImages();
  const { data: categoriesData } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  // tags handling (local state + RHF sync)
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    setValue("tags", tags, { shouldValidate: true });
  }, [tags, setValue]);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags((s) => [...s, tag]);
    }
  };
  const removeTag = (tag: string) => {
    setTags((s) => s.filter((t) => t !== tag));
  };
  const handleTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = (e.target as HTMLInputElement).value.trim();
      if (val) {
        addTag(val);
        (e.target as HTMLInputElement).value = "";
      }
    }
  };

  // images handling: keep previous images in a ref so we can merge with new files
  const reg = register("images");
  const { onChange: rhfOnChange, ref: inputRef, ...restRegister } = reg;
  const imgArr = watch("images") as (File | string)[] | undefined;
  const prevImagesRef = useRef<(File | string)[]>(imgArr || []);

  useEffect(() => {
    prevImagesRef.current = imgArr || [];
  }, [imgArr]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prevImages = prevImagesRef.current || [];
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    const combined = [...prevImages, ...newFiles];
    setValue("images", combined, { shouldValidate: true });
  };

  const handleDeleteImg = (target: string | File) => {
    const updatedImages = (imgArr || []).filter((image) => image !== target);
    setValue("images", updatedImages, { shouldValidate: true });
    prevImagesRef.current = updatedImages;
  };

  const onSubmit = async (data: AddProductFormValues) => {
    try {
      const newFiles = (data.images || []).filter(
        (img): img is File => img instanceof File
      );
      const existingUrls = (data.images || []).filter(
        (img): img is string => typeof img === "string"
      );

      let newUrls: string[] = [];
      if (newFiles.length > 0) {
        const form = new FormData();
        newFiles.forEach((file) => form.append("images", file, file.name));
        const uploadResponse = await uploadImages(form);
        // adapt this mapping to your upload response shape
        newUrls = uploadResponse.data?.successful?.map((i: any) => i.url) || [];
      }

      const finalImageUrls = [...existingUrls, ...newUrls];

      const payload = {
        ...data,
        images: finalImageUrls,
        tags,
      };

      addProduct(payload);
      onSuccess();
    } catch (err) {
      console.error("Add product error:", err);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Name */}
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

        {/* Weight & unit */}
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

        {/* isActive */}
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

        {/* Inventory */}
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

        {/* Category */}
        <fieldset className="custom-fieldset">
          <legend>Category</legend>
          <select className="custom-input" {...register("categoryId")}>
            <option value="">Select category</option>
            {categoriesData?.data?.categories?.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="custom-error">{errors.categoryId.message}</p>
          )}
        </fieldset>

        {/* Tags */}
        <fieldset className="custom-fieldset">
          <legend>Tags</legend>
          <input
            type="text"
            placeholder="Press enter to add tags"
            className={`custom-input`}
            onKeyDown={handleTag}
          />
          {tags.length !== 0 && (
            <div
              className="custom-input max-h-22 overflow-y-auto"
              style={{ backgroundColor: "white" }}
            >
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 flex justify-between gap-2 hover:bg-zinc-50"
                >
                  <span className="text-sm text-zinc-600">{tag}</span>
                  <X
                    onClick={() => removeTag(tag)}
                    className="w-3 text-zinc-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </fieldset>

        {/* Images */}
        <fieldset className="custom-fieldset">
          <legend>Images</legend>
          <div className="carousel carousel-center pr-2 w-full h-[300px]">
            {Array.isArray(imgArr) && imgArr.length > 0 ? (
              imgArr.map((img, idx) => {
                const src =
                  typeof img === "string" ? img : URL.createObjectURL(img);
                return (
                  <div key={idx} className="carousel-item w-full relative">
                    <img
                      src={src}
                      alt={`img-${idx}`}
                      className="w-full object-cover"
                    />
                    <X
                      onClick={() => handleDeleteImg(img)}
                      className="absolute top-1 right-2 text-orange-600 w-4 cursor-pointer"
                    />
                  </div>
                );
              })
            ) : (
              <div className="mx-auto px-10 pt-10">
                <ImageOff className="w-40 h-40 text-zinc-400 mx-auto" />
                <h3 className="mt-6 text-zinc-600 text-2xl">
                  No Image Avaiable
                </h3>
              </div>
            )}
          </div>

          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/jpg, image/webp"
            {...restRegister}
            onChange={(e) => {
              handleFileInputChange(e);
              rhfOnChange && rhfOnChange(e);
            }}
            className="file-input"
          />
        </fieldset>

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

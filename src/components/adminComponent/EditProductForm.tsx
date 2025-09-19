import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../../components/animata/LoadingButton";
import { useEditProduct } from "../../hooks/adminHooks/useEditProduct";
import {
  productSchema,
  type AddProductFormValues,
} from "../../types/product.schema";
import { useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useProductsData } from "../../hooks/userHooks/useProductsData";
import LoadingScreen from "../userComponent/LoadingScreen";
import { useCategories } from "../../hooks/userHooks/useCategories";
import { useUploadImages } from "../../hooks/adminHooks/useUploadImages";
import { ImageOff, X } from "lucide-react";

const EditProductForm = ({
  onSuccess,
  status,
}: {
  onSuccess: () => void;
  status: boolean;
}) => {
  const { mutate: editProduct } = useEditProduct();
  const { mutateAsync: uploadImages } = useUploadImages();
  const { data: productsData, isLoading: productDataLoading } =
    useProductsData(status);
  const { data: categoriesData } = useCategories();
  const [searchParams] = useSearchParams();
  const [tags, setTags] = useState<string[]>([]);

  const id = searchParams.get("id");
  const product = productsData?.data?.products?.find(
    (product: any) => product.id === id
  );

  // console.log("searchParams id:", id);
  // console.log(product);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      weight: "",
      weightUnit: "kg",
      isActive: true,
      inventoryQuantity: 0,
      categoryId: "",
      tags: [],
      images: [],
    },
  });

  // console.log("images", watch("images"));

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        weight: product.weight,
        weightUnit: product.weightUnit,
        isActive: product.isActive,
        inventoryQuantity: product.inventoryQuantity,
        categoryId: product.categoryId,
        tags: product.tags || [],
        images: product.images || [],
      });
      setTags(product.tags || []);
    }
  }, [product, reset]);

  // console.log(tags);
  // console.log("tags", watch("tags"));
  // inside component, where useForm is available
  const reg = register("images");
  // reg has { onChange, onBlur, name, ref } plus maybe other props
  const { onChange: rhfOnChange, ref: inputRef, ...restRegister } = reg;

  const imgArr = watch("images");
  console.log("isActive : ", watch("isActive"));
  // console.log("images", imgArr);
  const prevImagesRef = useRef<File[] | string[] | (string | File)[]>(
    imgArr || []
  );

  // keep ref in sync whenever images actually change (runs after render)
  useEffect(() => {
    prevImagesRef.current = imgArr || [];
  }, [imgArr]);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setValue("tags", [...tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    const filtered = tags.filter((t) => t !== tag);
    setTags(filtered);
    setValue("tags", filtered);
  };

  const handleTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    if (e.key === "Enter") {
      e.preventDefault();
      const tag = e.target.value.trim();
      if (tag) {
        addTag(tag);
        e.target.value = "";
      }
    }
  };

  const handleDeleteImg = (target: string | File) => {
    const updatedImages = imgArr.filter((image) => image !== target);
    setValue("images", updatedImages);
    // console.log(updatedImages);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prevImages = prevImagesRef.current || [];
    // console.log("Prev : ", prevImages);
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    // console.log("newFIle : ", newFiles);
    const combined = [...prevImages, ...newFiles];
    // console.log("combined : ", combined);

    // update form
    setValue("images", combined, { shouldValidate: true });
  };

  const onSubmit = async (data: AddProductFormValues) => {
    // split new files vs existing URLs
    // console.log();
    const newFiles = data.images.filter(
      (img): img is File => img instanceof File
    );
    const existingUrls = data.images.filter(
      (img): img is string => typeof img === "string"
    );

    let newUrls: string[] = [];

    if (newFiles.length > 0) {
      const form = new FormData();
      newFiles.forEach((file) => {
        form.append("images", file, file.name);
      });

      const uploadResponse = await uploadImages(form);
      // assume uploadResponse.data.successful is an array of objects with { url: string, ... }
      newUrls = uploadResponse.data.successful.map((imgObj: any) => imgObj.url);
    }

    // combine
    const finalImageUrls = [...existingUrls, ...newUrls];

    // prepare payload: replace `images` field with array of URLs
    const updatedData = {
      ...data,
      images: finalImageUrls,
    };

    if (id) {
      editProduct({ id, payload: updatedData });
    }
    onSuccess();
  };

  const onError = (err: any) => {
    console.log("Error : ", err);
  };

  return productDataLoading ? (
    <LoadingScreen />
  ) : (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
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

        {/* Category ID */}
        <fieldset className="custom-fieldset">
          <legend>Category</legend>
          <select className="custom-input" {...register("categoryId")}>
            {categoriesData?.data?.categories?.map((category: any) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
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
            // {...register("tags")}
            placeholder="Press enter to add tags"
            className={`${errors.tags ? "custom-input-error" : "custom-input"}`}
            onKeyDown={(e) => handleTag(e)}
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
          {errors.tags && <p className="custom-error">{errors.tags.message}</p>}
        </fieldset>

        {/* Images */}
        <fieldset className="custom-fieldset">
          <legend>Image</legend>
          <div className="carousel carousel-center pr-2 w-full h-[400px]">
            {Array.isArray(imgArr) && imgArr.length > 0 ? (
              imgArr.map((img, idx) => {
                let src: string;
                if (typeof img === "string") {
                  src = img;
                } else {
                  src = URL.createObjectURL(img);
                }
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
              <div className="mx-auto px-10 pt-20">
                <ImageOff className="w-40 h-40 text-zinc-400 mx-auto" />
                <h3 className="mt-6 text-zinc-600 text-2xl">
                  No Image Avaiable
                </h3>
              </div>
            )}
            {/* <img src={product?.images[0]} alt="" className="w-full" /> */}
          </div>
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/jpg, image/webp"
            // {...register("images", {
            //   onChange: (e) => handleFileInputChange(e),
            // })}
            {...restRegister}
            onChange={(e) => {
              // run our handler first (reads prevImagesRef)
              handleFileInputChange(e);
              // then call RHF's onChange so its internal subscriptions run
              rhfOnChange && rhfOnChange(e);
            }}
            className="file-input"
            // className={`${errors.images ? "custom-input-error" : "custom-input"}`}
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
  );
};

export default EditProductForm;

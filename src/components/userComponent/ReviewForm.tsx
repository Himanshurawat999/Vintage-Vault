import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../../components/animata/LoadingButton";
import { Star } from "lucide-react";
import { reviewSchema, type reviewInput } from "../../types/review.schema";
import { useAddReview } from "../../hooks/userHooks/useAddReview";
import { useParams } from "react-router";

interface Props {
  onSuccess: () => void;
}

const ReviewForm: React.FC<Props> = ({ onSuccess }) => {
  const { mutate, isPending } = useAddReview();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<reviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
    },
  });

  const rating = watch("rating");

  const onSubmit = (data: reviewInput) => {
    // console.log(data)
    mutate({ productId: id!, payload: data });
    onSuccess()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full  rounded ">
      <fieldset className="custom-fieldset">
        <legend>Rating</legend>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 cursor-pointer ${
                rating >= star ? "text-orange-500 fill-orange-500" : "text-gray-300"
              }`}
              onClick={() => setValue("rating", star)}
            />
          ))}
        </div>
        {errors.rating && (
          <p className="custom-error">{errors.rating.message}</p>
        )}
      </fieldset>

      <fieldset className="custom-fieldset">
        <legend>Title</legend>
        <input
          type="text"
          {...register("title")}
          placeholder="Enter a brief title"
          className={`${errors.title ? "custom-input-error" : "custom-input"}`}
        />
        {errors.title && <p className="custom-error">{errors.title.message}</p>}
      </fieldset>

      <fieldset className="custom-fieldset">
        <legend>Comment</legend>
        <textarea
          {...register("comment")}
          placeholder="Write your review"
          className={`${
            errors.comment ? "custom-input-error" : "custom-input"
          }`}
        />
        {errors.comment && (
          <p className="custom-error">{errors.comment.message}</p>
        )}
      </fieldset>

      <LoadingButton
        isPending={isSubmitting || isPending}
        type="submit"
        text="Submit Review"
      />
    </form>
  );
};

export default ReviewForm;

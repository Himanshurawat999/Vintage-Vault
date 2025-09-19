import { useState } from "react";
import { useGetReview } from "../../hooks/userHooks/useGetReview";
import { useGetReviewSum } from "../../hooks/userHooks/useGetReviewSum";
import { Plus, Star } from "lucide-react";
import Modal from "../adminComponent/Modal";
import ReviewForm from "./ReviewForm";
import { useParams } from "react-router";

const Reviews = () => {
  const { id } = useParams();
  console.log(id);
  const { data: reviewData } = useGetReview(id!);
  const { data: reviewSummaryData } = useGetReviewSum(id!);
  const summary = reviewSummaryData?.data?.summary;

  const [modalMode, setModalMode] = useState<"add" | null>(null);
  const reviews = reviewData?.data?.reviews;

  // console.log(summary);
  console.log(reviewData);

  const openAdd = () => {
    setModalMode("add");
  };

  const closeModal = () => {
    setModalMode(null);
  };

  const renderModalContent = () => {
    if (modalMode === "add") return <ReviewForm onSuccess={closeModal} />;
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mb-20 md:mt-12">
      {/* Summary Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="flex items-center space-x-4">
          <span className="text-4xl font-bold">
            {`${summary?.averageRating.toFixed(0)}.0` || "0.0"}
          </span>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(summary?.averageRating || 0)
                    ? "text-orange-500 fill-orange-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600">
            ({summary?.totalReviews || 0} reviews)
          </span>
        </div>

        {/* Ratings Breakdown */}
        <div className="mt-4 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center">
              <span className="w-10 text-sm">{star} ★</span>
              <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden mx-2">
                <div
                  className="h-2 bg-orange-500 rounded"
                  style={{
                    width: `${
                      ((summary?.ratingDistribution[star] || 0) /
                        (summary?.totalReviews || 1)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span className="w-12 text-sm text-gray-600">
                {summary?.ratingDistribution[star] || 0}
              </span>
            </div>
          ))}
        </div>

        {/* Verified Purchase Info */}
        {/* <p className="mt-3 text-sm text-gray-600">
          Verified Purchases: {summary?.verifiedPurchaseCount || 0} (
          {summary?.verifiedPurchasePercentage?.toFixed(2) || "0.00"}%)
        </p> */}
      </div>

      <button
        onClick={openAdd}
        className="flex items-center gap-2 p-1 md:py-2 md:px-4 mb-8 bg-zinc-300 hover:bg-orange-500 text-zinc-900 rounded cursor-pointer"
      >
        <Plus className="w-5 h-4" />
        <span className="text-sm">Add Review</span>
      </button>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews?.map((review: any) => (
          <div key={review.id} className="p-4 border border-zinc-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{review.title}</h3>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? "text-orange-500 fill-orange-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 text-gray-700">{review.comment}</p>
            <div className="mt-2 text-sm text-gray-500">
              By {review.user.firstName} {review.user.lastName} •{" "}
              {new Date(review.createdAt).toLocaleString()}
              {review.isVerifiedPurchase && (
                <span className="ml-2 text-green-600 font-medium">
                  Verified Purchase
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalMode !== null} onClose={closeModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Reviews;

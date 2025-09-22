import { useState } from "react";
import { useParams } from "react-router";
import {
  Heart,
  Minus,
  Plus,
  Star,
  Truck,
} from "lucide-react";
import { useProductDetails } from "../../hooks/userHooks/useProductDetails";
import NavBar from "../../components/userComponent/NavBar";
import Footer from "../../components/userComponent/Footer";
import { useAddCart } from "../../hooks/userHooks/useAddCart";
import Reviews from "../../components/userComponent/Reviews";
import { useWishlistToggle } from "../../hooks/userHooks/useWishlistToggle";
import { useGetReviewSum } from "../../hooks/userHooks/useGetReviewSum";
import LoadingScreen from "../../components/userComponent/LoadingScreen";

const ProductDetails = () => {
  document.title = `Vintage Vault | Product Details`

  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImg, setSelectedImg] = useState<number>(0);
  console.log(selectedImg);

  const { data: productDetails, isLoading: productDetailLoading } =
    useProductDetails(id);
  const { data: reviewSummaryData, isLoading: reviewSummaryDataLoading } =
    useGetReviewSum(id!);
  const summary = reviewSummaryData?.data?.summary;
  const product = productDetails?.data?.product;
  // console.log(productDetails);

  const { mutate, isPending } = useAddCart();
  const {
    isInWishlist,
    toggleWishlist,
    loading: wishlistLoading,
  } = useWishlistToggle(id);

  // console.log(isInWishlist);

  const handleCart = () => {
    // console.log("CArt");
    if (!product) return;

    const payload = {
      productId: product.id,
      quantity,
      productVariant: {
        size: "Large",
        color: "Blue",
        material: "Cotton",
        additionalProp1: {},
      },
    };

    mutate(payload);
  };

  const handleWishlist = () => {
    if (wishlistLoading) return;
    toggleWishlist();
  };

  return (
    <>
      <NavBar />
      {productDetailLoading || reviewSummaryDataLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="w-full sm:px-12 md:px-20 pt-24 flex flex-col sm:flex-row gap-x-10 lg:gap-x-24">
            <div id="left" className="w-[80%] mx-auto sm:w-1/2 relative">
                <div className="h-[400px] sm:h-[490px]">
                  <img
                    src={product.images[selectedImg]}
                    alt={product.images[selectedImg]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center gap-1 mt-4 mx-auto">
                  {product?.images.map((image: string, idx: number) => (
                    <div key={image} className="size-20 border border-zinc-400">
                      <img
                        src={image}
                        alt={image}
                        onClick={() => setSelectedImg(idx)}
                        className={`w-full h-full object-cover cursor-pointer ${selectedImg == idx ? "optional:0" : "opacity-35"}`}
                      />
                    </div>
                  ))}
                </div>
              <span onClick={handleWishlist} className="absolute top-4 right-2">
                <Heart
                  className={`cursor-pointer ${
                    isInWishlist
                      ? "fill-orange-500 text-orange-500 "
                      : "text-orange-500"
                  } ${wishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </span>
            </div>

            <div
              id="right"
              className="w-[80%] mx-auto sm:w-1/2 h-full py-6 text-zinc-800"
            >
              <h2 className="text-3xl font-fraunces">{product?.name}</h2>

              <div className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(summary?.averageRating || 0)
                          ? "text-orange-500 fill-orange-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-zinc-600">
                  {`${summary?.averageRating.toFixed(0)}.0` || "0.0"}
                </span>
                <span className="text-sm text-zinc-600">
                  ({summary?.totalReviews || 0} reviews)
                </span>
              </div>

              <p className="mt-4 text-zinc-600 w-4/5">{product?.description}</p>
              <p className="mt-4 text-lg font-medium">
                ${parseFloat(product?.price).toFixed(2)}
              </p>
              <div className="flex gap-2 text-zinc-600 mt-4">
                <Truck />
                <p>Estimated delivery in 6-8 weeks.</p>
              </div>
              <div className="mt-5">
                <h3 className="text-xl">Additional information</h3>
                {product?.inventoryQuantity <= 10 ? (
                  product?.inventoryQuantity == 0 ? (
                    <p className="text-sm text-orange-600 mt-2">
                      Out of Stock!
                    </p>
                  ) : (
                    <p className="text-sm text-orange-600 mt-2">
                      Hurry few items left!
                    </p>
                  )
                ) : null}

                <p className="text-sm text-zinc-600 mt-2">
                  Weight : {parseFloat(product?.weight).toFixed(2)}
                  {product?.weightUnit}
                </p>
                <p className="text-sm text-zinc-600 mt-2">
                  Category : {product?.category?.name}
                </p>
              </div>

              <div className="mt-6 md:mt-12 flex gap-3">
                <div
                  id="quantity"
                  className="w-1/3 px-4 border border-zinc-300 bg-zinc-100 flex justify-between items-center gap-4"
                >
                  <Minus
                    className="text-zinc-600 w-5 cursor-pointer"
                    onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  />
                  <p className="text-xl">{quantity}</p>
                  <Plus
                    className="text-zinc-600 w-5 cursor-pointer"
                    onClick={() => setQuantity((q) => q + 1)}
                  />
                </div>
                <button
                  onClick={handleCart}
                  disabled={isPending}
                  className={`w-2/3 px-4 py-1.5 text-zinc-50 cursor-pointer ${
                    isPending ? "bg-zinc-700" : "bg-zinc-900 hover:bg-zinc-800"
                  }`}
                >
                  {isPending ? "Adding..." : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
          <Reviews />
        </>
      )}
      <Footer />
    </>
  );
};

export default ProductDetails;

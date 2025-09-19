import { Heart } from "lucide-react";
import { useAddCart } from "../../hooks/userHooks/useAddCart";
import { useWishlistToggle } from "../../hooks/userHooks/useWishlistToggle";

const WishListCard = ({ item }: { item: any }) => {
  const { mutate: addCart, isPending } = useAddCart();

  const {
    isInWishlist,
    toggleWishlist,
    loading: wishlistLoading,
  } = useWishlistToggle(item.productId);

  const handleCart = (productId: string) => {
    console.log(isInWishlist);
    console.log("CArt", productId);
    if (!productId) return;

    const payload = {
      productId,
      quantity: 1,
      productVariant: {
        size: "Large",
        color: "Blue",
        material: "Cotton",
        additionalProp1: {},
      },
    };

    toggleWishlist();
    addCart(payload);
  };

  const handleWishlist = () => {
    if (wishlistLoading) return;
    toggleWishlist();
  };

  return (
    <li key={item.id} className="flex flex-col w-[300px] mx-auto relative">
      <span onClick={handleWishlist} className="absolute top-4 right-2">
        <Heart
          className={`cursor-pointer ${
            isInWishlist
              ? "fill-orange-500 text-orange-500 "
              : "text-orange-500"
          } ${wishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      </span>
      <div className="w-[300px] h-[400px]">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-zinc-800 font-fraunces text-lg mt-2">
          {item.product.name}
        </p>
        <h5 className="text-zinc-800 ">${item.product.price}</h5>
      </div>
      <button
        disabled={isPending}
        onClick={() => handleCart(item.productId)}
        className={`${
          isPending ? "bg-zinc-700" : "bg-zinc-900 hover:bg-zinc-800"
        } text-zinc-50 text-xs md:text-base px-3 py-3.5 md:px-5 md:py-5 rounded-full cursor-pointer shadow-sm shadow-orange-200 absolute -right-7 md:-right-12 bottom-32`}
      >
        Add to <br /> cart
      </button>
    </li>
  );
};

export default WishListCard;

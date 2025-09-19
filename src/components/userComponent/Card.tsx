import { Heart } from "lucide-react";
import { useNavigate } from "react-router";
import { useWishlistToggle } from "../../hooks/userHooks/useWishlistToggle";

const Card = ({ product }: { product: any }) => {
  const navigate = useNavigate();

  const {
    isInWishlist,
    toggleWishlist,
    loading: wishlistLoading,
  } = useWishlistToggle(product.id);

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleWishlist = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    console.log(e);
    if (wishlistLoading) return;
    toggleWishlist();
  };

  return (
    <div
      className="w-[75%] mx-auto sm:w-full h-96 cursor-pointer relative"
      onClick={handleClick}
    >
      <div className="w-full h-[80%] relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 left-2 text-orange-500 border border-orange-500 px-1 rounded-sm text-sm">
          {product.inventoryQuantity === 0
            ? "Out of Stock"
            : `${product.inventoryQuantity} left`}
        </span>
        <span
          onClick={(e) => handleWishlist(e)}
          className="absolute top-4 right-2"
        >
          <Heart
            className={`cursor-pointer ${
              isInWishlist
                ? "fill-orange-500 text-orange-500 "
                : "text-orange-500"
            } ${wishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </span>
      </div>

      <div>
        <h4 className="mt-4 font-medium">{product.name}</h4>
        <p className="mt-2 text-sm text-zinc-600">${product.price}</p>
      </div>
    </div>
  );
};

export default Card;

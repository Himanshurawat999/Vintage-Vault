import { useState } from "react";
import { useProductDetails } from "../hooks/useProductDetails";
import { useNavigate } from "react-router";

const Card = ({ product }: { product: any }) => {
  const [productId, setProductId] = useState(null);
  const { data } = useProductDetails(productId);
  const navigate = useNavigate();
  console.log(data);

  const handleClick = () => {
    setProductId(product.id);
    navigate(`/products/${product.id}`)
  };

  return (
    <div className="w-[75%] mx-auto sm:w-full h-96" onClick={handleClick}>
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
      </div>

      <div>
        <h4 className="mt-4 font-medium">{product.name}</h4>
        <p className="mt-2 text-sm text-zinc-600">${product.price}</p>
      </div>
    </div>
  );
};

export default Card;

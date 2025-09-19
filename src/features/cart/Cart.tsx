import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { useQuantity } from "../../hooks/userHooks/useQuantity";
import { useRemoveCartItem } from "../../hooks/userHooks/useRemoveCartItem";
import { useNavigate } from "react-router";

export default function Cart({ item }: { item: any }) {
  const [count, setCount] = useState<number>(() => item.quantity);
  const { mutate: updateQuantity } = useQuantity();
  const { mutate: removeCartItem } = useRemoveCartItem();
  const navigate = useNavigate();

  console.log(item)

  const handleMinus = (id: string) => {
    const newCount = count - 1;
    setCount((prev) => Math.max(prev - 1, 1));
    if (newCount <= 0) {
      handleDelete(id);
    } else {
      updateQuantity({ itemId: id, quantity: newCount });
    }
  };

  const handlePlus = (id: string) => {
    const newCount = count + 1;
    setCount((prev) => Math.min(prev + 1, item.product.inventoryQuantity));
    updateQuantity({ itemId: id, quantity: newCount });
  };

  const handleDelete = (id: string) => {
    removeCartItem({ itemId: id });
  };

  const handleProductDetail = (id:string) => {
    navigate(`/products/${id}`)

  }

  return (
    <div
      key={item.product.id}
      className="flex justify-between items-start border-b border-gray-200 pb-4"
    >
      <div className="flex items-start gap-4">
        <div className="w-24 h-24">
          <img
            src={item.product.images[0]}
            alt={item.product.name}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>

        <div className="flex flex-col">
          <p onClick={() => handleProductDetail(item.productId)} className="font-semibold text-gray-900 mb-2 cursor-pointer">
            {item.product.name}
          </p>
          <div className="flex gap-2 mb-2">
            <p className="text-lg font-semibold text-gray-900">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
            <span className="text-xs text-gray-600">x{item.quantity}</span>
          </div>
          <div className="flex items-center gap-4">
            <Minus
              className="text-zinc-600 w-3 cursor-pointer"
              onClick={() => handleMinus(item.id)}
            />
            <p className="text-sm text-gray-600">{count}</p>
            <Plus
              className="text-zinc-600 w-3 cursor-pointer"
              onClick={() => handlePlus(item.id)}
            />
          </div>
        </div>
      </div>
      <X
        className="w-5 text-gray-600 cursor-pointer"
        onClick={() => handleDelete(item.id)}
      />
    </div>
  );
}

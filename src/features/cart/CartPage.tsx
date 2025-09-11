import { Minus, Plus, X } from "lucide-react";
import { useGetCart } from "../../hooks/userHooks/useGetCart";
import { useQuantity } from "../../hooks/userHooks/useQuantity";
import { useRemoveCartItem } from "../../hooks/userHooks/useRemoveCartItem";
import { Link } from "react-router";
import NavBar from "../../components/userComponent/NavBar";
import Footer from "../../components/userComponent/Footer";

const CartPage = () => {
  const { data: cartDetails, isLoading, isError, error } = useGetCart();
  const cart = cartDetails?.data?.cart;
  console.log(cart);

  const { mutate: updateQuantity } = useQuantity();
  const { mutate: removeCartItem } = useRemoveCartItem();

  if (isLoading) return <p>Loading your cart...</p>;
  if (isError)
    return (
      <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>
    );

  const handleMinus = (productId: string, productQuantity: number) => {
    updateQuantity({
      itemId: productId,
      quantity: Math.max(productQuantity - 1, 0),
    });
  };

  const handlePlus = (productId: string, productQuantity: number) => {
    updateQuantity({ itemId: productId, quantity: productQuantity + 1 });
  };

  const handleDelete = (productId: string) => {
    console.log(productId);
    removeCartItem({ itemId: productId });
  };

  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 pt-14 mb-10 sm:px-6 lg:px-8">
        <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row gap-8 lg:gap-14">
          <div className="lg:w-2/3">
            <h3 className="font-fraunces text-3xl text-gray-800 mb-2">
              Cart Summary
            </h3>
            <div className="mb-10 flex items-center justify-between">
              <p className="text-lg text-gray-600">
                Total items: {cart?.summary?.totalItems}
              </p>
              <p className="text-lg text-gray-600">
                Total quantity: {cart?.summary?.totalQuantity}
              </p>
            </div>

            <div className="space-y-4">
              {cart?.items.map((item: any) => (
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
                      <p className="font-semibold text-gray-900 mb-1">
                        {item.product.name}
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-4">
                        <Minus
                          className="text-zinc-600 w-3 cursor-pointer"
                          onClick={() => handleMinus(item.id, item.quantity)}
                        />
                        <p className="text-sm text-gray-600">{item.quantity}</p>
                        <Plus
                          className="text-zinc-600 w-3 cursor-pointer"
                          onClick={() => handlePlus(item.id, item.quantity)}
                        />
                      </div>
                    </div>
                  </div>
                  <X
                    className="w-5 text-gray-600 cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-sm shadow-lg self-start">
            <h3 className="text-xl font-semibold text-gray-900">
              Order Details
            </h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-lg text-gray-600">Subtotal</span>
                <span className="text-lg font-semibold text-gray-800">
                  ${cart?.summary?.subtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg text-gray-700">Shipping</span>
                <span className="text-lg font-semibold text-gray-900">
                  Free
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg text-gray-600">Tax</span>
                <span className="text-lg font-semibold text-gray-800">
                  ${cart?.summary?.estimatedTax}
                </span>
              </div>
              <div className="flex justify-between mt-4 border-t border-gray-200 pt-4">
                <span className="text-lg text-gray-600">Total</span>
                <span className="text-xl font-semibold text-gray-800">
                  ${cart?.summary?.estimatedTotal}
                </span>
              </div>
            </div>
            <Link
              to="/shipping"
              className="mt-6 inline-block w-full py-3 text-center text-lg font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-xs"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;

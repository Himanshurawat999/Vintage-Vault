import { useGetCart } from "../../hooks/userHooks/useGetCart";
import {  useNavigate } from "react-router";
import NavBar from "../../components/userComponent/NavBar";
import Footer from "../../components/userComponent/Footer";
import Cart from "./Cart";
import LoadingScreen from "../../components/userComponent/LoadingScreen";

const CartPage = () => {
  const { data: cartDetails, isLoading: cartDetailLoading } = useGetCart();
  const cart = cartDetails?.data?.cart;
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      {cartDetailLoading ? (<LoadingScreen />) : (<div className="max-w-7xl mx-auto px-4 pt-14 mb-10 sm:px-6 lg:px-8">
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
                <Cart key={item.id} item={item}/>
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
                  {cart?.summary?.shippingAmount ? cart?.summary?.shippingAmount : "Free"}
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
            <button
              onClick={() => navigate("/shipping")}
              disabled={cart?.items.length === 0}
              className="mt-6 inline-block w-full py-3 text-center text-lg font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-xs disabled:cursor-not-allowed cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>)}
      <Footer />
    </>
  );
};

export default CartPage;

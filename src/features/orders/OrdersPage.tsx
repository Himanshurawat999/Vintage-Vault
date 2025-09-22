import { useGetCart } from "../../hooks/userHooks/useGetCart";
import { useLocation, useNavigate } from "react-router";
import NavBar from "../../components/userComponent/NavBar";
import { useGetShipping } from "../../hooks/userHooks/useGetShipping";
import { useCreateOrder } from "../../hooks/userHooks/useCreateOrder";
import LoadingScreen from "../../components/userComponent/LoadingScreen";
import { useRef, useState } from "react";
import orderConfirmGif from "../../../public/Images/success-order.gif";
import { useQueryClient } from "@tanstack/react-query";

const OrdersPage = () => {
  document.title = `Vintage Vault | Order`;

  const { data: cartDetails, isLoading: cartLoading } = useGetCart();
  const { data: addresses, isLoading: addressesLoading } = useGetShipping();
  const { mutate: createOrder, isPending: creatingOrder } = useCreateOrder();
  // const {shippingId} = useParams()
  const location = useLocation();
  const { shippingId } = location.state;
  console.log(shippingId);

  const paymentRef = useRef<HTMLInputElement>(null);
  console.log(paymentRef?.current?.checked);
  const [showGif, setShowGif] = useState(false);

  const cart = cartDetails?.data?.cart;
  const address = addresses?.data?.addresses?.find(
    (add: any) => add.id === shippingId
  );

  console.log("shippingId : ", shippingId);
  console.log("address : ", address);
  console.log("cart : ", cart);
  // const orderData = {
  //   shippingAddressId: address?.id,
  //   orderItems: []
  // }

  const defaultOrderPayload = {
    shippingAddressId: address?.id,
    orderItems: cart?.items.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity,
      productVariant: item.productVariant,
    })),
    shippingMethod: "standard",
    customerNotes: "",
    paymentConfirmed: false,
    metadata: { additionalProp1: {} },
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleConfirm = () => {
    const isCashOnDeliveryChecked = paymentRef.current?.checked!;
    const orderPayload = {
      ...defaultOrderPayload,
      paymentConfirmed: isCashOnDeliveryChecked,
    };
    createOrder(orderPayload, {
      onSuccess: (data) => {
        setShowGif(true); 
        setTimeout(() => {
          data && navigate(`${data?.data?.order?.id}`, { replace: true })
          queryClient.invalidateQueries({ queryKey: ['cart'] });
        }, 2000)
      },
    });
  };

  return (
    <>
      <NavBar />
      {cartLoading || addressesLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 pt-14 mb-10 sm:px-6 lg:px-8">
            <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row gap-8 lg:gap-14">
              <div className="lg:w-2/3">
                <div className="flex justify-between mb-8 md:mb-12">
                  <h3 className="font-fraunces font-light text-2xl md:text-3xl lg:text-5xl mb-4">
                    Order Summary
                  </h3>
                  <div className="w-[200px] lg:w-[250px]">
                    <h3 className="lg:text-xl font-semibold text-gray-800 mb-2 mt-2">
                      Delivering to {address?.firstName}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {address?.addressLine1},{" "}
                      {address?.addressLine2 && address?.addressLine2},{" "}
                      {address?.city}, {address?.state}, {address?.country}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 max-h-screen overflow-y-auto">
                  {cart?.items.map((item: any) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between items-start border-b border-gray-200 pb-4"
                    >
                      <div className="flex items-center gap-4 sm:gap-12">
                        <div className="w-14 h-14">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-sm"
                          />
                        </div>

                        <div className="flex gap-8">
                          <p className="font-semibold text-gray-600 mb-1 sm:w-[300px]">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Qty {item.quantity}
                          </p>
                          <p className="text-lg font-semibold text-gray-800">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-1/3 lg:mt-10 bg-gray-50 p-6 rounded-sm shadow-lg self-start">
                <h3 className="text-xl font-semibold text-gray-900">
                  Order Details
                </h3>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600">Total items</span>
                    <span className="text-lg font-semibold text-gray-600">
                      {cart?.summary?.totalItems}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600">
                      Total quantity
                    </span>
                    <span className="text-lg font-semibold text-gray-600">
                      {cart?.summary?.totalQuantity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600">Subtotal</span>
                    <span className="text-lg font-semibold text-gray-600">
                      ${cart?.summary?.subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-700">Shipping</span>
                    <span className="text-lg font-semibold text-gray-600">
                      {parseFloat(cart?.summary?.shippingAmount)
                        ? cart?.summary?.shippingAmount
                        : "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600">Tax</span>
                    <span className="text-lg font-semibold text-gray-600">
                      ${cart?.summary?.estimatedTax}
                    </span>
                  </div>

                  <div className="flex justify-between mt-4 border-t border-gray-200 pt-4">
                    <span className="text-lg text-gray-600">Total</span>
                    <span className="text-xl font-semibold text-gray-900">
                      ${cart?.summary?.estimatedTotal}
                    </span>
                  </div>
                </div>

                <label className="flex items-center gap-2 justify-center -mb-4">
                  <input
                    ref={paymentRef}
                    type="checkbox"
                    className="checkbox border rounded-sm size-4 p-0.5"
                  />
                  <span className="text-sm text-gray-600">Cash on Deliver</span>
                </label>
                <button
                  onClick={handleConfirm}
                  disabled={creatingOrder}
                  className={`mt-6 inline-block w-full py-3 text-center text-lg font-medium text-white cursor-pointer ${
                    creatingOrder ? "bg-orange-400" : "bg-orange-600"
                  }   hover:bg-orange-700 rounded-lg shadow-xs`}
                >
                  {creatingOrder ? "Placing order..." : "Confirm your order"}
                </button>
              </div>
            </div>
          </div>
          {/* Conditionally render the GIF after order is placed */}
          {showGif && (
            <div className="w-full h-screen flex items-center justify-center absolute top-0 bg-white">
              <div className="p-4 bg-white rounded-lg text-center w-80">
                <img
                  src={orderConfirmGif}
                  alt="Order Confirmation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OrdersPage;

import { useNavigate, useParams } from "react-router";
import { useOrderById } from "../../hooks/userHooks/useOrderById";
import NavBar from "../../components/userComponent/NavBar";
import LoadingScreen from "../../components/userComponent/LoadingScreen";

const OrderItem = () => {
  const { id } = useParams();
  console.log(id);
  const { data: orderItem, isLoading: orderItemLoading } = useOrderById(id);
  const order = orderItem?.data?.order;
  console.log(order);

  const navigate = useNavigate();

  const handleClick = (productId:string) => {
    navigate(`/products/${productId}`);
  };

  // createdAt, shippingAddress, status, paymentConfirmed, orderItems, orderNumber, totalAmount

  return (
    <>
      <NavBar />
      {orderItemLoading ? (
        <LoadingScreen />
      ) : (
        <div className="max-w-7xl mx-auto px-2 pt-24 mb-10 sm:px-6 lg:px-8">
          <div className="flex justify-between mb-8 md:mb-12">
            <div>
              <h3 className="font-fraunces font-light text-2xl md:text-3xl lg:text-5xl mb-2">
                Order Details
              </h3>
              <p className="text-xs sm:ml-1 text-gray-600 mb-1">
                Order # {order?.orderNumber}
              </p>
              <p className="text-xs sm:ml-1 text-gray-600">
                {new Date(order?.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="w-[200px] lg:w-[250px]">
              <h3 className="lg:text-xl font-semibold text-gray-800 mb-2 mt-2 text-right sm:text-left">
                Delivering to {order?.shippingAddress?.firstName}
              </h3>
              <p className="text-xs text-gray-600 text-right sm:text-left">
                {order?.shippingAddress?.addressLine1},{" "}
                {order?.shippingAddress?.addressLine2 &&
                  order?.shippingAddress?.addressLine2}
                , {order?.shippingAddress?.city},{" "}
                {order?.shippingAddress?.state},{" "}
                {order?.shippingAddress?.country}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Weight</th>
                  <th>Amount</th>
                  <th>Tax</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {order?.orderItems?.map((item: any) => (
                  <tr key={item.id} className="border-b border-zinc-400">
                    <td onClick={() => handleClick(item.productId)} className="hover:text-orange-500 hover:underline cursor-pointer">{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>
                      {item.weight} {item.weightUnit}
                    </td>
                    <td>${item.totalPrice}</td>
                    <td>${(item.totalPrice * 0.085).toFixed(2)}</td>
                    <td>
                      $
                      {(
                        item.totalPrice * 0.085 +
                        Number(item.totalPrice)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="font-medium">Subtotal Price</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="font-medium">${order?.totalAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderItem;

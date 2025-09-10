import { useParams } from "react-router";
import { useOrderById } from "../../hooks/userHooks/useOrderById";
import NavBar from "../../components/userComponent/NavBar";

const OrderItem = () => {
  const { id } = useParams();
  console.log(id);
  const { data: orderItem } = useOrderById(id);
  const order = orderItem?.data?.order;
  console.log(order);

  // createdAt, shippingAddress, status, paymentConfirmed, orderItems, orderNumber, totalAmount

  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto px-2 pt-24 mb-10 sm:px-6 lg:px-8">
        <div className="flex justify-between mb-8 md:mb-12">
          <div>
            <h3 className="font-fraunces font-light text-2xl md:text-3xl lg:text-5xl mb-2">
              Order Details
            </h3>
            <p className="text-xs sm:ml-1 text-gray-600 mb-1">
              Order No. {order?.orderNumber}
            </p>
            <p className="text-xs sm:ml-1 text-gray-600">{order?.createdAt}</p>
          </div>
          <div className="w-[200px] lg:w-[250px]">
            <h3 className="lg:text-xl font-semibold text-gray-800 mb-2 mt-2 text-right sm:text-left">
              Delivering to {order?.shippingAddress?.firstName}
            </h3>
            <p className="text-xs text-gray-600 text-right sm:text-left">
              {order?.shippingAddress?.addressLine1},{" "}
              {order?.shippingAddress?.addressLine2 &&
                order?.shippingAddress?.addressLine2}
              , {order?.shippingAddress?.city}, {order?.shippingAddress?.state},{" "}
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
              </tr>
            </thead>
            <tbody>
              {order?.orderItems?.map((item: any) => (
                <tr key={item.id} className="border-b border-zinc-400">
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {item.weight} {item.weightUnit}
                  </td>
                  <td>${item.totalPrice}</td>
                </tr>
              ))}
              <tr>
                <td className="font-medium">Total Price</td>
                <td></td>
                <td></td>
                <td className="font-medium">${order?.totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderItem;

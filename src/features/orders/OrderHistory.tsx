import { useNavigate } from "react-router";
import NavBar from "../../components/userComponent/NavBar";
import { useGetOrder } from "../../hooks/userHooks/useOrder";
import LoadingScreen from "../../components/userComponent/LoadingScreen";

const OrderHistory = () => {
  const { data: fetchOrder, isLoading: fetchOrderLoading } = useGetOrder();
  console.log(fetchOrder);
  const navigate = useNavigate();

  const handleMore = (orderId: string) => {
    console.log(orderId);
    navigate(`/orders/${orderId}`);
  };

  return (
    <>
      <NavBar />
      {fetchOrderLoading ? (<LoadingScreen />) : (<div className="max-w-7xl mx-auto px-4 pt-24 mb-10 sm:px-6 lg:px-8">
        <h3 className="font-fraunces font-light text-2xl md:text-3xl lg:text-5xl mb-8 md:mb-12">
          Order History
        </h3>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Ordered For</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {fetchOrder?.data?.orders?.map((order: any) => (
                <tr key={order.id} className="border-b border-zinc-400">
                  <td>{order.orderNumber}</td>
                  <td>{order.shippingAddress.firstName}</td>
                  <td>${order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>{order.paymentConfirmed ? "confirm" : "pending"}</td>
                  <td
                    onClick={() => handleMore(order.id)}
                    className="text-orange-500 hover:underline cursor-pointer"
                  >
                    more
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>)}
    </>
  );
};

export default OrderHistory;

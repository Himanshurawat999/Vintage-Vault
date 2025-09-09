import { useNavigate } from "react-router";
import NavBar from "../../components/NavBar";
import { useGetOrder } from "../../hooks/useOrder";

const OrderHistory = () => {
  const { data: fetchOrder } = useGetOrder();
  console.log(fetchOrder);
  const navigate = useNavigate();

  const handleMore = (orderId: string) => {
    console.log(orderId);
    navigate(`/orders/${orderId}`)
  };

  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 pt-24 mb-10 sm:px-6 lg:px-8">
        <h3 className="font-fraunces font-light text-2xl md:text-3xl lg:text-5xl mb-8 md:mb-12">
          Order History
        </h3>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th className="w-[50%]">Order no.</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {fetchOrder?.data?.orders?.map((order: any) => (
                <tr key={order.id} className="border-b border-zinc-400">
                  <td>{order.orderNumber}</td>
                  <td>${order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>{order.paymentConfirmed ? "Confirm" : "Pending"}</td>
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
      </div>
    </>
  );
};

export default OrderHistory;

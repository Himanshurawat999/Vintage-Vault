import { useGetShipping } from "../../hooks/useGetShipping";
import { useGetOrder } from "../../hooks/useOrder";

const OrdersPage = () => {
  const { data: fetchOrder } = useGetOrder();
  const { data: fetchShippingAddresses } = useGetShipping();

  console.log(fetchOrder);
  console.log(fetchShippingAddresses);

  return <div>OrdersPage</div>;
};

export default OrdersPage;

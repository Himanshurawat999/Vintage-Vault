import React, { useEffect, useState } from "react";
import Modal from "../../components/adminComponent/Modal";
import { useGetOrder } from "../../hooks/userHooks/useOrder";
import StatusForm from "../../components/adminComponent/StatusOrderForm";
import ConfirmPaymentForm from "../../components/adminComponent/ConfirmPaymentOrderForm";
import CancelForm from "../../components/adminComponent/CancelOrderForm";
import LoadingScreen from "../../components/userComponent/LoadingScreen";

type ModalMode = "status" | "confirmPayment" | "cancel" | null;

const AdminOrder: React.FC = () => {
  const [status, setStatus] = useState<string>("pending");
  const { data: ordersData, isLoading: orderDataLoading } = useGetOrder(status);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  console.log(ordersData?.data?.orders);

  useEffect(() => {
    if (!orderDataLoading && ordersData?.data?.orders?.length === 0) {
      setSelectedOrderId(null);
    }
  }, [orderDataLoading, ordersData]);

  const openStatusModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setModalMode("status");
  };

  const openConfirmModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setModalMode("confirmPayment");
  };

  const openCancelModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setModalMode("cancel");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedOrderId(null);
  };

  const handleSeleted = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  const renderModalContent = () => {
    if (modalMode === "status")
      return (
        <StatusForm
          orderId={selectedOrderId!}
          onSuccess={closeModal}
          selectedStatus={status}
        />
      );
    if (modalMode === "confirmPayment")
      return (
        <ConfirmPaymentForm orderId={selectedOrderId!} onSuccess={closeModal} />
      );
    if (modalMode === "cancel")
      return <CancelForm orderId={selectedOrderId!} onSuccess={closeModal} />;
    return null;
  };

  return orderDataLoading ? (
    <LoadingScreen />
  ) : (
    <div className="mx-auto px-4 pt-6 md:pt-12 mb-10 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end">
        <h3 className="font-fraunces font-light text-2xl md:text-3xl lg:text-5xl mb-8 md:mb-12">
          Orders
        </h3>
        <fieldset className="custom-fieldset">
          <select
            defaultValue={"pending"}
            onChange={(e) => handleSeleted(e)}
            className="custom-input"
          >
            <option value="pending">pending</option>
            <option value="confirmed">confirmed</option>
            <option value="processing">processing</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
            <option value="cancelled">cancelled</option>
            <option value="returned">returned</option>
            <option value="refunded">refunded</option>
          </select>
        </fieldset>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Order Status</th>
              <th>Payment</th>
              {status !== "cancelled" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {ordersData?.data?.orders?.map((order: any) => (
              <tr
                key={order.id}
                className="border-b border-zinc-400 hover:bg-zinc-100"
              >
                <td>{order.id}</td>
                <td>{order?.user?.firstName}</td>
                <td>{parseFloat(order?.totalAmount).toFixed(2)}</td>
                <td>{order.status}</td>
                <td>{order.paymentConfirmed ? "confirmed" : "failed"}</td>
                <td className="space-x-3">
                  <span
                    className="text-lime-500 cursor-pointer"
                    onClick={() => openStatusModal(order.id)}
                  >
                    Order Status
                  </span>

                  {status !== "cancelled" && (
                    <>
                      <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => openConfirmModal(order.id)}
                      >
                        Payment
                      </span>

                      <span
                        className="text-red-500 cursor-pointer"
                        onClick={() => openCancelModal(order.id)}
                      >
                        Cancel
                      </span>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalMode !== null} onClose={closeModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default AdminOrder;

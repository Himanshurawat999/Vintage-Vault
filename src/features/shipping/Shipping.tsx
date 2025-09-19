import { useEffect, useState } from "react";
import { useGetShipping } from "../../hooks/userHooks/useGetShipping";
import { useNavigate, useSearchParams } from "react-router";
import { SquarePen, Trash } from "lucide-react";
import { useRemoveShipping } from "../../hooks/userHooks/useRemoveShipping";
import Modal from "../../components/adminComponent/Modal";
import ShippingForm from "../../components/userComponent/ShippingForm";
import ShippingEditForm from "../../components/userComponent/ShippingEditForm";
import LoadingScreen from "../../components/userComponent/LoadingScreen";

type ModalMode = "add" | "edit" | null;

export function Shipping() {
  const { data: addresses, isLoading: addressesLoading } = useGetShipping();
  const { mutate: removeShipping } = useRemoveShipping();

  const [, setSearchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (addresses?.data?.addresses?.length === 0) setSelectedId(null);
    if (!addressesLoading && addresses?.data?.addresses) {
      const defaultAddress = addresses.data.addresses.find(
        (addr: any) => addr.isDefault
      );
      if (defaultAddress) setSelectedId(defaultAddress.id);
    }
  }, [addressesLoading, addresses]);

  const handleDeliver = () => {
    navigate(`/orders`, { state: { shippingId: selectedId } });
  };

  const handleDelete = (shippingId: string) => {
    removeShipping({ itemId: shippingId });
  };

  const handleEdit = (shippingId: string) => {
    setSearchParams({ shippingId });
    setModalMode("edit");
  };

  const closeModal = () => {
    setSearchParams();
    setModalMode(null);
  };
  const openAdd = () => {
    setModalMode("add");
  };

  const renderForm = () => {
    if (modalMode == "add") {
      return <ShippingForm />;
    }
    if (modalMode == "edit") {
      return <ShippingEditForm />;
    }
    return null;
  };

  return addressesLoading ? (
    <LoadingScreen />
  ) : (
    <div className="p-4 sm:w-[50%] mx-auto">
      <h2 className="font-fraunces text-3xl text-gray-800 mb-6">
        Select a delivery address
      </h2>
      <div className="space-y-3">
        {addresses?.data?.addresses?.length ? (
          addresses?.data?.addresses.map((addr: any) => (
            <div
              key={addr.id}
              className={`border p-3 rounded-md flex items-start space-x-2 relative hover:bg-orange-50 ${
                selectedId === addr.id ? "border-orange-500" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="selectedAddress"
                checked={selectedId === addr.id}
                onChange={() => setSelectedId(addr.id)}
                className="mt-1"
              />
              <div>
                <p className="font-medium">
                  {addr.firstName} {addr.lastName}
                </p>
                <p>
                  {addr.addressLine1}
                  {addr.addressLine2 && `, ${addr.addressLine2}`}
                </p>
                <p>
                  {addr.city}, {addr.state}, {addr.postalCode}
                </p>
                <p>{addr.country}</p>
                <p>Phone: {addr.phoneNumber}</p>
              </div>
              <SquarePen
                onClick={() => handleEdit(addr.id)}
                className="absolute right-3 w-4 cursor-pointer text-red-400"
              />
              <Trash
                onClick={() => handleDelete(addr.id)}
                className="absolute bottom-2 right-5 w-4 cursor-pointer text-red-400"
              />
            </div>
          ))
        ) : (
          <p>No addresses found. Please add one.</p>
        )}
      </div>

      <div className="mt-4 flex flex-col space-y-2">
        <button
          onClick={handleDeliver}
          disabled={!selectedId}
          className={`py-2 px-4 rounded-md font-medium ${
            selectedId
              ? "bg-orange-400 hover:bg-orange-500 text-zinc-100 cursor-pointer"
              : "bg-gray-200 text-zinc-600 cursor-not-allowed"
          }`}
        >
          Deliver to this address
        </button>

        <button
          onClick={openAdd}
          className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md font-medium cursor-pointer"
        >
          Add a new delivery address
        </button>
      </div>

      <Modal isOpen={modalMode !== null} onClose={closeModal}>
        {renderForm()}
      </Modal>
    </div>
  );
}

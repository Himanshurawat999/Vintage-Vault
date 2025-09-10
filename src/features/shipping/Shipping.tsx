import { useEffect, useState } from "react";
import { useGetShipping } from "../../hooks/userHooks/useGetShipping";
import { useAddShipping } from "../../hooks/userHooks/useAddShipping";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShippingSchema,
  type ShippingFormInput,
} from "../../types/shipping.schema";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Trash } from "lucide-react";
import { useRemoveShipping } from "../../hooks/userHooks/useRemoveShipping";

export function Shipping() {
  const { data: addresses, isLoading } = useGetShipping();
  const { mutate: addShipping } = useAddShipping();
  const { mutate: removeShipping } = useRemoveShipping();
  console.log("Address : ", addresses?.data?.addresses.length);

  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (addresses?.data?.addresses?.length === 0) setSelectedId(null);
    if (!isLoading && addresses?.data?.addresses) {
      const defaultAddress = addresses.data.addresses.find(
        (addr: any) => addr.isDefault
      );
      if (defaultAddress) setSelectedId(defaultAddress.id);
    }
  }, [isLoading, addresses]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInput>({
    resolver: zodResolver(ShippingSchema),
  });

  const onSubmit = (data: ShippingFormInput) => {
    addShipping(data); // new address
  };

  const handleDeliver = () => {
    console.log("shippingId : ", selectedId);
    // navigate(`/orders/${selectedId}`);
    navigate(`/orders`, { state: { shippingId: selectedId } });
  };

  const handleDelete = (shippingId: string) => {
    removeShipping({ itemId: shippingId });
  };

  if (isLoading) return <p>Loading addresses...</p>;

  return (
    <div className="p-4 sm:w-[50%] mx-auto">
      {!showForm ? (
        <>
          <h2 className="font-fraunces text-3xl text-gray-800 mb-6">
            Select a delivery address
          </h2>
          <div className="space-y-3">
            {addresses?.data?.addresses?.length ? (
              addresses?.data?.addresses.map((addr: any) => (
                <div
                  key={addr.id}
                  className={`border p-3 rounded-md flex items-start space-x-2 relative hover:bg-orange-50 ${
                    selectedId === addr.id
                      ? "border-orange-500"
                      : "border-gray-300"
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
                  <Trash
                    onClick={() => handleDelete(addr.id)}
                    className="absolute right-3 w-4 cursor-pointer text-red-400"
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
                  ? "bg-orange-400 hover:bg-orange-500 text-zinc-100"
                  : "bg-gray-200 text-zinc-600 cursor-not-allowed"
              }`}
            >
              Deliver to this address
            </button>

            <button
              onClick={() => setShowForm(true)}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md font-medium"
            >
              Add a new delivery address
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <fieldset className="custom-fieldset">
            <legend>First Name</legend>
            <input
              {...register("firstName")}
              placeholder="First Name"
              className={`${
                errors.firstName ? "custom-input-error" : "custom-input"
              }`}
            />
            {errors.firstName && (
              <p className="custom-error">{errors.firstName.message}</p>
            )}
          </fieldset>

          {/* Last Name */}
          <fieldset className="custom-fieldset">
            <legend>Last Name</legend>
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className={`${
                errors.lastName ? "custom-input-error" : "custom-input"
              }`}
            />
            {errors.lastName && (
              <p className="custom-error">{errors.lastName.message}</p>
            )}
          </fieldset>

          {/* Company */}
          <fieldset className="custom-fieldset">
            <legend>Company</legend>
            <input
              {...register("company")}
              placeholder="Company"
              className="custom-input"
            />
          </fieldset>

          {/* Address Line 1 */}
          <fieldset className="custom-fieldset">
            <legend>Address Line 1</legend>
            <input
              {...register("addressLine1")}
              placeholder="Address Line 1"
              className={`${
                errors.addressLine1 ? "custom-input-error" : "custom-input"
              }`}
            />
            {errors.addressLine1 && (
              <p className="custom-error">{errors.addressLine1.message}</p>
            )}
          </fieldset>

          {/* Address Line 2 */}
          <fieldset className="custom-fieldset">
            <legend>Address Line 2</legend>
            <input
              {...register("addressLine2")}
              placeholder="Address Line 2"
              className="custom-input"
            />
          </fieldset>

          {/* City */}
          <fieldset className="custom-fieldset">
            <legend>City</legend>
            <input
              {...register("city")}
              placeholder="City"
              className={`${
                errors.city ? "custom-input-error" : "custom-input"
              }`}
            />
            {errors.city && (
              <p className="custom-error">{errors.city.message}</p>
            )}
          </fieldset>

          {/* State */}
          <fieldset className="custom-fieldset">
            <legend>State</legend>
            <input
              {...register("state")}
              placeholder="State"
              className={`${
                errors.state ? "custom-input-error" : "custom-input"
              }`}
            />
            {errors.state && (
              <p className="custom-error">{errors.state.message}</p>
            )}
          </fieldset>

          {/* Postal Code */}
          <fieldset className="custom-fieldset">
            <legend>Postal Code</legend>
            <input
              {...register("postalCode")}
              placeholder="Postal Code"
              className={`${
                errors.postalCode ? "custom-input-error" : "custom-input"
              }`}
            />
            {errors.postalCode && (
              <p className="custom-error">{errors.postalCode.message}</p>
            )}
          </fieldset>

          {/* Country */}
          <fieldset className="custom-fieldset">
            <legend>Country</legend>
            <input
              {...register("country")}
              placeholder="Country"
              className={`${
                errors.country ? "custom-input-error" : "custom-input"
              }`}
            />
            {errors.country && (
              <p className="custom-error">{errors.country.message}</p>
            )}
          </fieldset>

          {/* Phone Number */}
          <fieldset className="custom-fieldset">
            <legend>Phone Number</legend>
            <input
              {...register("phoneNumber")}
              placeholder="Phone Number"
              className={`${
                errors.phoneNumber ? "custom-input-error" : "custom-input"
              }`}
            />
            {errors.phoneNumber && (
              <p className="custom-error">{errors.phoneNumber.message}</p>
            )}
          </fieldset>

          {/* Default Address */}
          <label className="flex items-center gap-3">
            <p className="font-medium text-zinc-800">Default Address</p>
            <input type="checkbox" {...register("isDefault")} />
          </label>

          <div className="flex space-x-2 mt-4">
            <button
              type="submit"
              className="bg-orange-300 py-2 px-6 rounded-md font-medium text-lg text-zinc-800 cursor-pointer"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-zinc-300 py-2 px-6 rounded-md font-medium text-lg text-zinc-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

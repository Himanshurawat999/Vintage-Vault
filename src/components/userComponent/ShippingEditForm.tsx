import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShippingSchema,
  type ShippingFormInput,
} from "../../types/shipping.schema";
import { useForm } from "react-hook-form";
import LoadingButton from "../animata/LoadingButton";
import { useEditShipping } from "../../hooks/userHooks/useEditShipping";
import { useEffect } from "react";
import { useGetShipping } from "../../hooks/userHooks/useGetShipping";
import { useSearchParams } from "react-router";

const ShippingEditForm = () => {
  const { mutate: editShipping } = useEditShipping();
  const { data: addresses } = useGetShipping();
  const [searchParams] = useSearchParams();

  const shippingId = searchParams.get("shippingId");
  const address = addresses?.data?.addresses?.find(
    (address: any) => address.id === shippingId
  );
  console.log(shippingId)
  console.log(address);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormInput>({
    resolver: zodResolver(ShippingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phoneNumber: "",
      isDefault: false,
    },
  });

  useEffect(() => {
    if (address) {
      reset({
        firstName: address.firstName,
        lastName: address.lastName,
        company: address.company,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        phoneNumber: address.phoneNumber,
        isDefault: address.isDefault,
      });
    }
  }, [address, reset]);

  const onSubmit = (payload: ShippingFormInput) => {
    shippingId && editShipping({shippingId, payload});
    console.log(payload)
  };

  return (
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
          className={`${errors.city ? "custom-input-error" : "custom-input"}`}
        />
        {errors.city && <p className="custom-error">{errors.city.message}</p>}
      </fieldset>

      {/* State */}
      <fieldset className="custom-fieldset">
        <legend>State</legend>
        <input
          {...register("state")}
          placeholder="State"
          className={`${errors.state ? "custom-input-error" : "custom-input"}`}
        />
        {errors.state && <p className="custom-error">{errors.state.message}</p>}
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

      <LoadingButton
        isPending={isSubmitting}
        type="submit"
        text="Add Address"
      />
    </form>
  );
};

export default ShippingEditForm;

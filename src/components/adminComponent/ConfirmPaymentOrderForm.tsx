import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../../components/animata/LoadingButton";
import { useOrderConfirmPayment } from "../../hooks/adminHooks/useOrderConfirmPayment";
import { orderConfirmPaymentSchema, type OrderConfirmPaymentValues } from "../../types/orderStatus.schema";

interface Props {
  orderId: string;
  onSuccess: () => void;
}

const ConfirmPaymentForm: React.FC<Props> = ({ orderId, onSuccess }) => {
  const { mutate, isPending } = useOrderConfirmPayment();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OrderConfirmPaymentValues>({
    resolver: zodResolver(orderConfirmPaymentSchema),
    defaultValues: { comment: "", isCustomerVisible: false },
  });

  const onSubmit = (data: OrderConfirmPaymentValues) => {
    mutate({ orderId, payload: data }, { onSuccess });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <fieldset className="custom-fieldset">
        <legend>Comment</legend>
        <textarea {...register("comment")} placeholder="Payment confirmation note" className={`${errors.comment ? "custom-input-error" : "custom-input"}`} />
        {errors.comment && <p className="custom-error">{errors.comment.message}</p>}
      </fieldset>

      <fieldset className="custom-fieldset">
        <legend>Customer Visible</legend>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="checkbox" {...register("isCustomerVisible")} />
          <span>Show confirmation to customer</span>
        </label>
        {errors.isCustomerVisible && <p className="custom-error">{errors.isCustomerVisible.message}</p>}
      </fieldset>

      <LoadingButton isPending={isSubmitting || isPending} type="submit" text="Confirm Payment" />
    </form>
  );
};

export default ConfirmPaymentForm;

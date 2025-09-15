import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../../components/animata/LoadingButton";
import { useOrderCancel } from "../../hooks/adminHooks/useOrderCancel";
import { orderCancel, type OrderCancelValues } from "../../types/orderStatus.schema";

interface Props {
  orderId: string;
  onSuccess: () => void;
}

const CancelForm: React.FC<Props> = ({ orderId, onSuccess }) => {
  const { mutate, isPending } = useOrderCancel();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OrderCancelValues>({
    resolver: zodResolver(orderCancel),
    defaultValues: { reason: "" },
  });

  const onSubmit = (data: OrderCancelValues) => {
    mutate({ orderId, payload: data }, { onSuccess });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <fieldset className="custom-fieldset">
        <legend>Reason for cancellation</legend>
        <textarea {...register("reason")} placeholder="Why are you cancelling?" className={`${errors.reason ? "custom-input-error" : "custom-input"}`} />
        {errors.reason && <p className="custom-error">{errors.reason.message}</p>}
      </fieldset>

      <LoadingButton isPending={isSubmitting || isPending} type="submit" text="Cancel Order" />
    </form>
  );
};

export default CancelForm;

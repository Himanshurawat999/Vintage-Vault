import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../../components/animata/LoadingButton";
import { useOrderStatus } from "../../hooks/adminHooks/useOrderStatus";
import { orderStatusSchema, type OrderStatusValues } from "../../types/orderStatus.schema";

interface Props {
  orderId: string;
  onSuccess: () => void;
}

const StatusForm: React.FC<Props> = ({ orderId, onSuccess }) => {
  const { mutate, isPending } = useOrderStatus();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OrderStatusValues>({
    resolver: zodResolver(orderStatusSchema),
    defaultValues: { status: "pending", comment: "", isCustomerVisible: false },
  });

  const onSubmit = (data: OrderStatusValues) => {
    mutate({ orderId, payload: data }, { onSuccess });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <fieldset className="custom-fieldset">
        <legend>Status</legend>
        <select {...register("status")} className={`${errors.status ? "custom-input-error" : "custom-input"}`}>
          <option value="pending">pending</option>
          <option value="confirmed">confirmed</option>
          <option value="processing">processing</option>
          <option value="shipped">shipped</option>
          <option value="delivered">delivered</option>
          <option value="cancelled">cancelled</option>
          <option value="refunded">refunded</option>
          <option value="returned">returned</option>
        </select>
        {errors.status && <p className="custom-error">{errors.status.message}</p>}
      </fieldset>

      <fieldset className="custom-fieldset">
        <legend>Comment</legend>
        <textarea {...register("comment")} placeholder="Optional comment" className={`${errors.comment ? "custom-input-error" : "custom-input"}`} />
        {errors.comment && <p className="custom-error">{errors.comment.message}</p>}
      </fieldset>

      <fieldset className="custom-fieldset">
        <legend>Customer Visible</legend>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="checkbox" {...register("isCustomerVisible")} />
          <span>Show update to customer</span>
        </label>
        {errors.isCustomerVisible && <p className="custom-error">{errors.isCustomerVisible.message}</p>}
      </fieldset>

      <LoadingButton isPending={isSubmitting || isPending} type="submit" text="Update Status" />
    </form>
  );
};

export default StatusForm;

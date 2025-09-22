// src/hooks/useCreateOrder.ts
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import { toast } from "react-hot-toast";
import type { CreateOrder } from "../../types/order.schema";
// import { useNavigate } from "react-router";
// import OrderConfirmGif from "../../../public/Images/success-order.gif"

const createOrder = async (data: CreateOrder): Promise<any> => {
  const res = await apiClient.post("/orders", data);
  return res.data;
};

export const useCreateOrder = () => {
  // const queryClient = useQueryClient();
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: createOrder,
    // onSuccess: (data) => {
    //   console.log("Order placed successfully:", data);
    //   console.log(data?.order?.id)
    //   data && navigate(`${data?.data?.order?.id}`, { replace: true })

    //   toast.success("Order placed successfully!", {
    //     position: "top-center",
    //     duration: 2000,
    //   });

    //   queryClient.invalidateQueries({ queryKey: ['cart'] });
    // },
    onError: (error: any) => {
      console.error("Order creation failed:", error?.response?.data?.error?.message);
      const errorMsg = error?.response?.data?.error?.message || "Order failed";
      toast.error(errorMsg, {
        position: "top-right",
      });
    },
  });
};

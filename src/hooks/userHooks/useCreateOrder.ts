// src/hooks/useCreateOrder.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import type { CreateOrder } from "../../types/order.schema";

const createOrder = async (data: CreateOrder): Promise<any> => {
  const res = await apiClient.post("/orders", data);
  return res.data;
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log("Order placed successfully:", data);
      toast.success("Order placed successfully!", {
        position: "top-center",
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      console.error("Order creation failed:", error?.response?.data?.error?.message);
      const errorMsg = error?.response?.data?.error?.message || "Order failed";
      toast.error(errorMsg, {
        position: "top-right",
      });
    },
  });
};

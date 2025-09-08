// src/hooks/useGetShipping.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const fetchShippingAddresses = async (): Promise<any> => {
  const res = await apiClient.get("/shipping-addresses");
  return res.data;
};

export const useGetShipping = () => {
  return useQuery({
    queryKey: ["shippingAddresses"],
    queryFn: fetchShippingAddresses,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient"

const getOrderById = async (orderId?: string | null) => {
    const res = await apiClient.get(`/orders/${orderId}`)
    return res.data;
}

export const useOrderById = (orderId?: string | null) => {
    return useQuery({ queryKey: ['orderById', orderId], queryFn: () => getOrderById(orderId), placeholderData: keepPreviousData, enabled: orderId !== null })
}

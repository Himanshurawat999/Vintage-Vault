import { keepPreviousData, useQuery } from "@tanstack/react-query"
import apiClient from "../../api/apiClient"

const getReviewSum = async (productId: string) => {
    const res = await apiClient.get(`/products/${productId}/reviews/summary`)
    return res.data;
}

export const useGetReviewSum = (productId: string) => {
    return useQuery({
        queryKey: ['reviewSummary'],
        queryFn: () => getReviewSum(productId),
        placeholderData: keepPreviousData,
        enabled: productId !== null,
    })
}
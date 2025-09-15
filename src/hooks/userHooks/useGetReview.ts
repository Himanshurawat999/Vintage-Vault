import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";

const getReview = async (productId: string): Promise<any> => {
    const res = await apiClient.get(`/products/${productId}/reviews`);
    return res.data;
};

export const useGetReview = (productId: string) => {
    return useQuery({
        queryKey: ["review"],
        queryFn: () => getReview(productId),
        placeholderData: keepPreviousData,
        enabled: productId !== null
    });
};
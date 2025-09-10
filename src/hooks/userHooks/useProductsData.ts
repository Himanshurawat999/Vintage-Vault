import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";

const getProductsData = async (categoryId?: string | null) => {
    const url = categoryId ? `/products?categoryId=${categoryId}` : `/products`
    const res = await apiClient.get(url);
    return res.data;
}

export const useProductsData = (categoryId?: string | null) => {
    return useQuery({ queryKey: ['products', categoryId], queryFn: () => getProductsData(categoryId), placeholderData: keepPreviousData });
}
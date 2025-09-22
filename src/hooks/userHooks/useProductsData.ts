import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";

const getProductsData = async ({ isActive, categoryId, page, search }: { isActive?: boolean | null, categoryId?: string | null, page?: number, search?: string }) => {
    console.log("Search : ", search)
    console.log(page)
    const url = categoryId ? `/products?isActive=${isActive}&categoryId=${categoryId}` : search ? `/products?isActive=${isActive}&page=${page}&search=${search}` : `/products?isActive=${isActive}&page=${page}`
    const res = await apiClient.get(url);
    return res.data;
}

export const useProductsData = (isActive?: boolean, categoryId?: string | null, page?: number, search?: string) => {
    return useQuery({
        queryKey: ['products', isActive, categoryId, page, search],
        queryFn: () => getProductsData({ isActive, categoryId, page, search }),
        placeholderData: keepPreviousData
    });
}
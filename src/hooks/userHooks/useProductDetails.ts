import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient"

const getProductDetails = async (productId?: string | null) => {
    const res = await apiClient.get(`/products/${productId}`)
    return res.data;
}

export const useProductDetails = (productId?: string | null) => {
    return useQuery({
        queryKey: ['productDetails', productId],
        queryFn: () => getProductDetails(productId),
        placeholderData: keepPreviousData,
        enabled: productId !== null
    })
}

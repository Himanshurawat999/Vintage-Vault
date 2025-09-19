import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";

const getProductsData = async ({ isActive, categoryId }: { isActive?: boolean | null, categoryId?: string | null }) => {
    // console.log(isActive)
    // console.log("categoryId : ", categoryId)
    // console.log(categoryId ? "true" : "false")
    const url = categoryId ? `/products?isActive=${isActive}&categoryId=${categoryId}` : `/products?isActive=${isActive}`
    // const url2 = isActive ? `/products?isActive=${isActive}` : url;
    const url2 = `/products?isActive=${isActive}`;
    // console.log("url : ", url)
    const res = await apiClient.get(url);
    return res.data;
}

export const useProductsData = (isActive?: boolean, categoryId?: string | null) => {
    return useQuery({
        queryKey: ['products', isActive, categoryId],
        queryFn: () => getProductsData({isActive, categoryId}),
        placeholderData: keepPreviousData
    });
}
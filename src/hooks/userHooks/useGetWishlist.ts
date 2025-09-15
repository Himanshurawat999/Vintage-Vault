import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";

const getWishlist = async (): Promise<any> => {
    const res = await apiClient.get(`/users/wishlist`);
    return res.data;
};

export const useGetWishlist = () => {
    return useQuery({
        queryKey: ["wishlist"],
        queryFn: () => getWishlist(),
        placeholderData: keepPreviousData,
    });
};
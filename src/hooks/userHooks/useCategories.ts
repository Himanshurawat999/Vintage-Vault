import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";

const getCategories = async (status?:string) => {
    const url = status == null ? `/categories` : `/categories?isActive=${status}`
    const res = await apiClient.get(url);
    return res.data;
}

export const useCategories = (status?:string) => {
    return useQuery({ queryKey: ['categories', status], queryFn:() => getCategories(status), placeholderData: keepPreviousData });
}
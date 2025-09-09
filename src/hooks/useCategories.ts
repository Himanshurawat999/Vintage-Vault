import {  keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const getCategories = async () => {
    const res = await apiClient.get('/categories');
    return res.data;
}

export const useCategories = () => {
    return useQuery({ queryKey: ['categories'], queryFn: getCategories, placeholderData: keepPreviousData });
}
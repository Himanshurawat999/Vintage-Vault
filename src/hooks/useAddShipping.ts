import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import type { ShippingFormInput } from "../types/shipping.schema";

const addShipping = async (data: ShippingFormInput): Promise<any> => {
    const res = await apiClient.post('/shipping-addresses', data);
    return res.data;
}

export const useAddShipping = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: addShipping,
        onSuccess: (data) => {
            console.log('Address Successful : ', data);
            toast.success(data.message, {
                position: 'top-center',
                duration: 2000,
              });
            navigate("/orders")
        },
        onError: (error) => {
            console.error('Registration failed : ', error?.response?.data?.error?.message)
            const errorMsg = error?.response?.data?.error?.message;
            toast.error(errorMsg, {
                position: "top-right"
            })
        }
    });
}
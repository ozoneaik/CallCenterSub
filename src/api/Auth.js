import axiosClient from "../axios.js";
import {ErrorResponse} from "./ErrorResponse.js";

export const profileApi = async () => {
    try {
        const {data,status} = await axiosClient.get('/profile');
        return {data, status};
    }catch(error) {
        return ErrorResponse(error);
    }
}

export const logoutApi = async () => {
    try {
        const {data,status} = await axiosClient.post('/logout');
        return {data, status};
    }catch(error) {
        return ErrorResponse(error);
    }
}
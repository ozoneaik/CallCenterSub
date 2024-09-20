import axiosClient from "../axios.js";
import {ErrorResponse} from "./ErrorResponse.js";

export const ListMessageApi = async (roomId) => {
    try {
        const {data,status} = await axiosClient.get(`/messages/listMessage/room/${roomId}`);
        return {data,status};
    }catch (error){
        return ErrorResponse(error);
    }
}

export const MessageCustApi = async (custId) => {
    try {
        const {data,status} = await axiosClient.get(`/messages/selectMessage/${custId}`);
        return {data,status};
    }catch (error){
        return ErrorResponse(error);
    }
}
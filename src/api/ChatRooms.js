import axiosClient from "../axios.js";
import {ErrorResponse} from "./ErrorResponse.js";

export const ChatRoomsApi = async () => {
    try {
        const {data,status} = await axiosClient.get(`/chatRoom/list`);
        return {data, status};
    }catch(error) {
        return ErrorResponse(error);
    }
}
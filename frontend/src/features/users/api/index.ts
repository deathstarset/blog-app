import { BASE_URL } from "@/constants";
import axios from "axios";
import { GetUserResponse } from "../types";

export const getAllUsers = async () => {
  return (await axios({ method: "get", url: `${BASE_URL}/user` })).data;
};

export const getUser = async (userId: string): Promise<GetUserResponse> => {
  return (await axios({ method: "get", url: `${BASE_URL}/user/${userId}` }))
    .data;
};

import { BASE_URL } from "@/constants";
import axios from "axios";
import { GetAllCommentsResponse } from "../types";

export const getAllComments = async (
  postId: string | undefined,
  userId: string | undefined
): Promise<GetAllCommentsResponse> => {
  let queryString = "?";
  if (postId) {
    queryString += `postId=${postId}`;
  }
  if (userId) {
    queryString += `userId=${userId}`;
  }

  return (
    await axios({ method: "get", url: `${BASE_URL}/comment${queryString}` })
  ).data;
};

export const getComment = async (
  commentId: string
): Promise<GetAllCommentsResponse> => {
  return (
    await axios({ method: "get", url: `${BASE_URL}/comment/${commentId}` })
  ).data;
};

import { BASE_URL } from "@/constants";
import axios from "axios";
import { GetAllLikesResponse } from "../types";

export const getAllLikes = async (
  postId: string | undefined,
  userId: string | undefined,
  commentId: string | undefined
): Promise<GetAllLikesResponse> => {
  let queryString = "?";
  if (postId) {
    queryString += `postId=${postId}`;
  }
  if (userId) {
    queryString += `userId=${userId}`;
  }
  if (commentId) {
    queryString += `commentId=${commentId}`;
  }
  return (await axios({ method: "get", url: `${BASE_URL}/like${queryString}` }))
    .data;
};

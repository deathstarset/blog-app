import axios from "axios";
import { BASE_URL } from "../../../constants/index";
import { GetPostResponse, GetPostsResponse } from "../types";

export const getAllPosts = async (): Promise<GetPostsResponse> => {
  return (await axios({ method: "get", url: `${BASE_URL}/post` })).data;
};

export const getPost = async (postId: string): Promise<GetPostResponse> => {
  return (await axios({ method: "get", url: `${BASE_URL}/post/${postId}` }))
    .data;
};

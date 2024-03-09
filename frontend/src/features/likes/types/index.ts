export enum LikeType {
  POST = "post",
  COMMENT = "comment",
}

export interface Like {
  id: string;
  isLike: boolean;
  type: LikeType;
  userId: string;
  postId: string | null;
  commentId: string | null;
  createdAt: Date;
}

export interface GetAllLikesResponse {
  success: boolean;
  data: {
    likes: Like[];
  };
  message: string;
}

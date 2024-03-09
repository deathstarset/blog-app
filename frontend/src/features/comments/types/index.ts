export interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  createdAt: Date;
}

export interface GetAllCommentsResponse {
  success: boolean;
  data: {
    comments: Comment[];
  };
  message: string;
}

export interface GetCommentResponse {
  success: boolean;
  data: {
    comment: Comment;
  };
  message: string;
}

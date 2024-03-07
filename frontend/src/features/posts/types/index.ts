export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  userId: string;
}

export interface GetPostsResponse {
  success: boolean;
  data: {
    posts: Post[];
  };
  message: string;
}

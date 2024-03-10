import { useQuery } from "react-query";
import { Post } from "../types";
import { getUser } from "@/features/users/api";
import { getAllComments } from "@/features/comments/api";
import { PostUserInfo } from "@/features/users/components/PostUserInfo";
import { Card } from "@/components/ui/card";
import { CommentPost } from "@/features/comments/components/CommentPost";
interface ViewPostProps {
  post: Post;
}

export const ViewPost = ({ post }: ViewPostProps) => {
  const { data: userData } = useQuery(["users", post.userId], () =>
    getUser(post.userId)
  );
  const { data: commentsData } = useQuery(["comments", post.userId], () =>
    getAllComments(post.id, undefined)
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Post image goes here</h1>
      {userData && <PostUserInfo user={userData.data.user} />}
      <p>{post.content}</p>
      <h2 className="text-lg font-bold">Comments</h2>
      <div className="flex flex-col gap-3">
        {commentsData &&
          commentsData.data.comments.map((comment) => {
            return <CommentPost key={comment.id} comment={comment} />;
          })}
      </div>
    </div>
  );
};

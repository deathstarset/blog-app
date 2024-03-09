import { Card } from "@/components/ui/card";
import { Post as P } from "../types";
import { useQuery } from "react-query";
import { getUser } from "@/features/users/api";
import { getAllComments } from "@/features/comments/api";
import { CommentsCount } from "@/features/comments/components/CommentsCount";
import { getAllLikes } from "@/features/likes/api";
import { LikesCount } from "@/features/likes/components/LikesCount";
import { PostUserInfo } from "@/features/users/components/PostUserInfo";

interface PostProps {
  post: P;
}
export const Post = ({ post }: PostProps) => {
  const { data: userData } = useQuery(["users", post.userId], () =>
    getUser(post.userId)
  );
  const { data: commentsData } = useQuery(["comments", post.id], () =>
    getAllComments(post.id, undefined)
  );
  const { data: likesData } = useQuery(["likes", post.id], () =>
    getAllLikes(post.id, undefined, undefined)
  );

  return (
    <Card className="p-3 flex flex-col gap-3">
      {userData && <PostUserInfo user={userData.data.user} />}
      <div className="text-2xl font-semibold">{post.title}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {likesData && <LikesCount likes={likesData.data.likes} />}
          {commentsData && (
            <CommentsCount comments={commentsData.data.comments} />
          )}
        </div>
      </div>
    </Card>
  );
};

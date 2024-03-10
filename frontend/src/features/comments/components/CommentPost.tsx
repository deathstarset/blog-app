import { useQuery } from "react-query";
import { Comment } from "../types";
import { Card } from "@/components/ui/card";
import { getUser } from "@/features/users/api";
import { getDate } from "@/utils";
import { getAllLikes } from "@/features/likes/api";
import { LikesCount } from "@/features/likes/components/LikesCount";
interface CommentPostProps {
  comment: Comment;
}
export const CommentPost = ({ comment }: CommentPostProps) => {
  const { data: userData } = useQuery(["users", comment.userId], () =>
    getUser(comment.userId)
  );

  const { data: likesData } = useQuery(["likes", comment.id], () =>
    getAllLikes(undefined, undefined, comment.id)
  );

  if (userData) {
    return (
      <div>
        <Card className="p-3 rounded-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{userData.data.user.username}</h3>
            <h3>{getDate(comment.createdAt)}</h3>
          </div>
          <p>{comment.content}</p>
          {likesData && <LikesCount likes={likesData.data.likes} />}
        </Card>
      </div>
    );
  }
};

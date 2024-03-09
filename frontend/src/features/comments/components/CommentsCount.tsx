import { MessageCircleMore } from "lucide-react";
import { Comment } from "../types";

interface CommentsCountProps {
  comments: Comment[];
}
export const CommentsCount = ({ comments }: CommentsCountProps) => {
  return (
    <div className="flex items-center gap-1">
      <MessageCircleMore size={20} />
      <div>{comments.length}</div>
    </div>
  );
};

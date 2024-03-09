import { Like } from "../types";
import { Heart } from "lucide-react";
interface LikesCountProps {
  likes: Like[];
}
export const LikesCount = ({ likes }: LikesCountProps) => {
  return (
    <div className="flex items-center gap-1">
      <Heart size={20} />
      <div>{likes.length}</div>
    </div>
  );
};

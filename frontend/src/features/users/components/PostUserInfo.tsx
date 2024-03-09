import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "../types";
interface PostUserInfoProps {
  user: User;
}
export const PostUserInfo = ({ user }: PostUserInfoProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0">
        <div className="text-sm font-medium">{user.username}</div>
      </div>
    </div>
  );
};

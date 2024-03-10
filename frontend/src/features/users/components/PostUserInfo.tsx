import { User } from "../types";
import { UserAvatar } from "./UserAvatar";
interface PostUserInfoProps {
  user: User;
}
export const PostUserInfo = ({ user }: PostUserInfoProps) => {
  return (
    <div className="flex items-center gap-3">
      <UserAvatar user={user} />
      <div className="flex flex-col gap-0">
        <div className="text-sm font-medium">{user.username}</div>
      </div>
    </div>
  );
};

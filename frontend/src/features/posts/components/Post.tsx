import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post as P } from "../types";
import { useQuery } from "react-query";
import { getUser } from "@/features/user/api";
import { getDate } from "../utils";

interface PostProps {
  post: P;
}
export const Post = ({ post }: PostProps) => {
  const { data } = useQuery("user", () => getUser(post.userId));

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ">
            <div className="text-sm font-medium">
              {data?.data.user.username}
            </div>
            <div className="text-sm">{getDate(post.createdAt)}</div>
          </div>
        </CardTitle>
        <CardDescription className="text-xl font-semibold">
          {post.title}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};

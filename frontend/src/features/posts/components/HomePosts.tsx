import { useQuery } from "react-query";
import { getAllPosts } from "../api";
import { Post } from "./Post";
import { Skeleton } from "@/components/ui/skeleton";
export const HomePosts = () => {
  const { status, data } = useQuery("posts", getAllPosts);
  return (
    <div className="flex flex-col gap-3">
      {status === "loading" &&
        [1, 2, 3, 4].map((_, index) => {
          return (
            <Skeleton key={index} className="h-[200px] w-full bg-slate-300" />
          );
        })}
      {data?.data.posts.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
};

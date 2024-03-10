import { useQuery } from "react-query";
import { getAllPosts } from "../api";
import { Post } from "./Post";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
export const HomePosts = () => {
  const { status, data: PostsData } = useQuery("posts", getAllPosts);
  return (
    <div className="flex flex-col gap-3">
      {status === "loading" &&
        [1, 2, 3, 4].map((_, index) => {
          return (
            <Skeleton key={index} className="h-[200px] w-full bg-slate-300" />
          );
        })}
      {PostsData &&
        PostsData.data.posts.map((post) => {
          return (
            <Link to={`${post.id}`} key={post.id}>
              <Post post={post} />
            </Link>
          );
        })}
    </div>
  );
};

import { getPost } from "@/features/posts/api";
import { ViewPost } from "@/features/posts/components/ViewPost";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const Post = () => {
  const { postId } = useParams();
  const { data: postData, isSuccess } = useQuery(["posts", postId], () =>
    getPost(postId as string)
  );

  return (
    <div className="px-3 pb-3">
      {isSuccess && <ViewPost post={postData.data.post} />}
    </div>
  );
};

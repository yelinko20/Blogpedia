import { useLocation } from "react-router-dom";

import { getSearchPost } from "@/api/posts/fetch";
import Posts from "@/components/posts/Posts";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/query-keys";

export default function PostSearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");

  // const { user } = useUserAuth() as UserContextType;

  const modifiedQuery = q?.replace("-", " ");
  const {
    data: searchPosts,
    isLoading,
    isSuccess,
  } = useQuery({
    queryFn: () => getSearchPost(q!),
    queryKey: [QueryKeys.GetSearchPost],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isSuccess && (
        <div className=" grid grid-cols-3">
          <div className="col-start-1 col-span-2">
            <p className="text-3xl mb-10">
              Results for <b>{modifiedQuery}</b>
            </p>
            {searchPosts.map((post) => {
              return <Posts key={post.id} post={post} isLoading={false} />;
            })}
          </div>
          <div className="col-start-3">Hello</div>
        </div>
      )}
      {isSuccess && searchPosts?.length === 0 && (
        <div className="flex items-center justify-center h-80">
          <p className="text-7xl">No Posts Found!</p>
        </div>
      )}
    </div>
  );
}

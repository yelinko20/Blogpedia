import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getSearchPost } from "@/api/posts/fetch";
import { PostProps, UserContextType } from "@/types/types";
import Posts from "@/components/posts/Posts";
import { useUserAuth } from "@/context/UserContextProvider";

export default function PostSearchPage() {
  const [searchPosts, setSearchPosts] = useState<PostProps[]>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");

  const { user } = useUserAuth() as UserContextType;

  const modifiedQuery = q?.replace("-", " ");

  useEffect(() => {
    (async () => {
      const posts = await getSearchPost(q!);
      setSearchPosts(posts);
    })();
  }, [q]);

  return (
    <div>
      {searchPosts.length === 0 ? (
        <div className="flex items-center justify-center h-80">
          <p className="text-7xl">No Posts Found!</p>
        </div>
      ) : (
        <div className=" grid grid-cols-3">
          <div className="col-start-1 col-span-2">
            <p className="text-3xl mb-10">
              Results for <b>{modifiedQuery}</b>
            </p>
            {searchPosts.map((post) => {
              return <Posts key={post.id} post={post} user={user} />;
            })}
          </div>
          <div className="col-start-3">Hello</div>
        </div>
      )}
    </div>
  );
}

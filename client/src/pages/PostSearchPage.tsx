import { Link, useLocation } from "react-router-dom";

import { getSearchPost } from "@/api/posts/fetch";
import Posts from "@/components/posts/Posts";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/query-keys";
import { Icons } from "@/icons/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
    queryKey: [QueryKeys.GetSearchPost, q],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 w-full">
        <Icons.spinner className="mr-2 h-12 w-12 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {isSuccess && (
        <div className=" grid grid-cols-3">
          <div className="lg:col-start-1 lg:col-span-2 col-span-3 col-start-1 min-h-screen">
            <p className="text-3xl mb-10">
              Results for <b>{modifiedQuery}</b>
            </p>
            {searchPosts.map((post) => {
              return <Posts key={post.id} post={post} isLoading={false} />;
            })}
          </div>
          <div className="hidden lg:block mt-6">
            <div className="sticky top-24">
              <div className="bg-paleBlue max-w-[17rem] p-4 rounded-md">
                <p className="mb-2 text-lg font-bold dark:text-black">
                  Write on Blogpedia
                </p>
                <p className="text-sm leading-6 dark:text-black">
                  New writer FAQ
                </p>
                <p className="text-sm leading-6 dark:text-black">
                  Expert writing advice
                </p>
                <p className="text-sm leading-6 dark:text-black">
                  Grow your readership
                </p>
                <Link
                  to={"/write-post"}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "rounded-full px-4 mt-4 dark-bg-black dark:text-white dark:bg-black"
                  )}
                >
                  <p className="text-sm">Start writing</p>
                </Link>
              </div>
            </div>
          </div>
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

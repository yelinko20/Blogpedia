import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ProfileModal from "@/components/ProfileModal";
import Posts from "@/components/posts/Posts";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { QueryKeys } from "@/constants/query-keys";
import { getAllPublishedPosts } from "@/api/posts/fetch";

export default function Feed() {
  const {
    isLoading,
    isError,
    isSuccess,
    data: posts,
  } = useQuery({
    queryFn: getAllPublishedPosts,
    queryKey: [QueryKeys.GetAllPosts],
  });

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <>
      <ProfileModal />
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="lg:col-start-1 lg:col-span-2 col-span-3 col-start-1 min-h-screen">
          {isSuccess &&
            posts.length > 0 &&
            posts?.map((post) => {
              return <Posts key={post.id} post={post} isLoading={isLoading} />;
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
    </>
  );
}

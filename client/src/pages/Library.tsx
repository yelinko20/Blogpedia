import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getAllSavedPosts } from "@/api/savedPosts/fetch";
import Posts from "@/components/posts/Posts";
import { buttonVariants } from "@/components/ui/button";
import { useUserAuth } from "@/context/UserContextProvider";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hook";
import { addSavedPosts } from "@/redux/slice/saved-post-slice";
import { QueryKeys } from "@/constants/query-keys";

export default function Library() {
  const { user } = useUserAuth();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const {
    isSuccess,
    isLoading,
    data: posts,
  } = useQuery({
    queryFn: () => getAllSavedPosts(user?.id as string),
    queryKey: [QueryKeys.GetAllSavedPosts, user?.id],
  });

  queryClient.invalidateQueries([QueryKeys.GetAllSavedPosts, user?.id]);
  return (
    <div>
      <div className="text-3xl font-medium mb-8">Your Libray</div>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="lg:col-start-1 lg:col-span-2 col-span-3 col-start-1 min-h-screen">
          {isSuccess &&
            (!posts.length ? (
              <div className="md:text-3xl text-xl font-semibold  h-80 flex items-center justify-center">
                THERE IS NO YOUR SAVED POSTS
              </div>
            ) : (
              posts.map((post) => {
                dispatch(addSavedPosts(post));
                return (
                  <Posts
                    key={post.id}
                    post={post.post}
                    // user={user}
                    isLoading={isLoading}
                  />
                );
              })
            ))}
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
    </div>
  );
}

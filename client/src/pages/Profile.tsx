import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";

import { getAllPostsByUsername } from "@/api/posts/fetch";
import { getUserProfile } from "@/api/user/fetch";
import EditGeneralProfile from "@/components/EditGeneralProfile";
import Posts from "@/components/posts/Posts";
import { Button } from "@/components/ui/button";
import { QueryKeys } from "@/constants/query-keys";
import { useUserAuth } from "@/context/UserContextProvider";

export default function Profile() {
  const { username } = useParams();
  const { user } = useUserAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isProfilePath =
    location.pathname === `/profile/${user?.profile.username}`;

  const {
    // isLoading,
    isSuccess: isProfileSuccess,
    data: profile,
  } = useQuery({
    queryFn: () => getUserProfile(username as string),
    queryKey: [QueryKeys.GetUserProfile, username],
  });

  const {
    isLoading: isAllPostsLoading,
    isSuccess: isAllPostsSuccess,
    data,
  } = useQuery({
    queryFn: () => getAllPostsByUsername(username as string),
    queryKey: [getAllPostsByUsername, username],
  });

  return (
    <>
      <EditGeneralProfile isOpen={isOpen} setIsOpen={setIsOpen} />
      {isProfileSuccess && (
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-start-1 lg:col-span-2 lg:border-r lg:border-muted lg:px-8 min-h-screen">
            <div className="flex items-center justify-evenly flex-wrap gap-8">
              <div className="flex items-center  justify-center gap-4">
                {profile.image ? (
                  <div className=" sm:h-20 sm:w-20 w-14 h-14 rounded-full overflow-hidden lg:hidden">
                    <img
                      src={profile.image}
                      alt="profile image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="sm:h-20 sm:w-20 w-12 h-12 rounded-full overflow-hidden lg:hidden flex items-center justify-center sm:text-5xl text-2xl"
                    style={{ backgroundColor: profile.bgColor }}
                  >
                    {user?.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="lg:text-5xl sm:text-3xl text-2xl font-bold font-roboto">
                    {profile.user.name}
                  </p>
                  <p className="text-sm text-muted-foreground lg:hidden mt-2">
                    {profile.bio}
                  </p>
                </div>
              </div>
              {user?.id !== profile.user.id && (
                <div className="lg:hidden text-center">
                  <Button
                    onClick={() =>
                      toast.success("Follow feature is still developing", {
                        style: {
                          border: "1px solid hsl(var(--primary))",
                          padding: "16px",
                          color: "hsl(var(--primary))",
                        },
                        iconTheme: {
                          primary: "#713200",
                          secondary: "#FFFAEE",
                        },
                        duration: 3000,
                      })
                    }
                  >
                    Follow
                  </Button>
                </div>
              )}
              {user?.id == profile.user.id && (
                <div className=" lg:hidden text-center">
                  <Button>Edit profile</Button>
                </div>
              )}
            </div>
            <div className="mt-14">
              {isAllPostsSuccess && data.posts.length > 0 ? (
                data.posts.map((post) => {
                  return (
                    <Posts
                      key={post.id}
                      post={post}
                      isLoading={isAllPostsLoading}
                      isProfilePath={isProfilePath}
                    />
                  );
                })
              ) : (
                <div className="md:text-3xl text-xl font-semibold  h-80 flex items-center justify-center">
                  THERE IS NO YOUR POSTS
                </div>
              )}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className=" sticky top-24">
              <div className="">
                {!profile.image ? (
                  <div
                    className={`w-16 h-16 rounded-full inline-flex items-center justify-center text-4xl  select-none text-white`}
                    style={{ backgroundColor: profile.bgColor }}
                  >
                    {profile.user.name.charAt(0)}
                  </div>
                ) : (
                  <div className=" h-20 w-20 rounded-full overflow-hidden">
                    <img
                      src={profile.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <p className="text-foreground mt-3">{profile.user.name}</p>
                <p className="text-muted-foreground mt-1">{profile.bio}</p>
              </div>
              {user?.id !== profile.user.id && (
                <div className="mt-4">
                  <Button
                    onClick={() =>
                      toast.success("Follow feature is still developing", {
                        style: {
                          border: "1px solid hsl(var(--primary))",
                          padding: "16px",
                          color: "hsl(var(--primary))",
                        },
                        iconTheme: {
                          primary: "#713200",
                          secondary: "#FFFAEE",
                        },
                        duration: 3000,
                      })
                    }
                  >
                    Follow
                  </Button>
                </div>
              )}
              {user?.id == profile.user.id && (
                <div className="mt-4">
                  <Button onClick={() => setIsOpen(true)}>Edit profile</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

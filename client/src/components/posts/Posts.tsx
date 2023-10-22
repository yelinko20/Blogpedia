import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostProps, UserProps } from "@/types/types";
import { truncateText } from "@/utils/truncateText";
import { createSavedPost, deleteSavedPost } from "@/api/savedPosts/fetch";
import renderPostContent from "@/components/posts/RenderPostContent";
import toast from "react-hot-toast";
import { getLoggedInUser } from "@/api/user/fetch";
import { QueryKeys } from "@/constants/query-keys";
import { Link } from "react-router-dom";
import FormatTime from "@/utils/formatTime";
import { Separator } from "@/components/ui/separator";
import PostLoading from "@/loading/PostLoading";
import AlertModal from "@/components/modal/alert-modal";

type FeedPostProps = {
  post: PostProps;
  isLoading: boolean;
  isProfilePath?: boolean;
};

const Posts: React.FC<FeedPostProps> = ({
  post,
  isLoading,
  isProfilePath,
}: FeedPostProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // const location = useLocation();

  // const isLibrayPath = location.pathname === "/me/lists";

  const queryClient = useQueryClient();
  const { mutate: CreateSavedPost } = useMutation(
    async ({ postId, userId }: { postId: string; userId: string }) => {
      const res = await createSavedPost(postId, userId);
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.CreateSavedPost]);
        toast.success("Post saved!");
        fetchUser();
        setIsSaved(true);
      },
    }
  );

  const { mutate: DeleteSavedPost } = useMutation(
    async ({ id }: { id: string }) => {
      setLoading(true);
      await deleteSavedPost(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.DeleteSavedPost]);
        queryClient.invalidateQueries([QueryKeys.GetAllSavedPosts]);
        toast.success("Post unsaved!");
        fetchUser();
        setOpen(false);
        setIsSaved(false);
      },
    }
  );

  async function fetchUser() {
    const data = await getLoggedInUser();
    setUser(data);
  }

  useEffect(() => {
    fetchUser();
    queryClient.invalidateQueries([QueryKeys.GetUser]);
  }, [queryClient]);

  if (isLoading) {
    return <PostLoading />;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const blocks = post.content.blocks;
  let concatenatedText = "";
  let firstImage: string | undefined = undefined;

  blocks.forEach((block: { type: string; data: { text: string } }) => {
    if (block.type === "paragraph") {
      concatenatedText += block.data.text + " ";
    }
  });

  blocks.some((block: { type: string; data: { file: { url: string } } }) => {
    if (block.type === "image") {
      firstImage = block.data.file.url;
      return true;
    }
    return false;
  });

  const textWithoutHtml = concatenatedText.replace(/<[^>]*>/g, "");
  const shortText = truncateText(textWithoutHtml, 100, 300);
  const littleShorterText = truncateText(textWithoutHtml, 50, 150);
  const tag = post?.tags[0]?.name;

  const { image, bgColor, username } = post.author.profile;
  const { name } = post.author;
  const splitName = name.charAt(0);
  const publishTimeOrDate = FormatTime(post?.publishedAt);

  const savedPost = user?.savedPosts.find(
    (savedPost) => savedPost.postId === post.id
  );

  function onConfirm() {
    if (savedPost) {
      DeleteSavedPost({ id: savedPost.id });
      // isLibrayPath && window.location.assign("/me/lists");
    }
  }

  return (
    <div>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        title="Are you sure?"
        description="This action can remove your saved post from your library"
      />
      <div className="flex items-center gap-2 mt-4 pl-4">
        {!isProfilePath && (
          <>
            <Link to={`/profile/${username}`}>
              {image ? (
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-8 h-8 rounded-full inline-flex justify-center items-center"
                  style={{ backgroundColor: bgColor, color: "white" }}
                >
                  {splitName}
                </div>
              )}
            </Link>
            <Link
              to={`/profile/${username}`}
              className="text-sm text-muted-foreground"
            >
              {name}
            </Link>
          </>
        )}
        <p className="text-sm text-muted-foreground">{publishTimeOrDate}</p>
      </div>
      {firstImage ? (
        <div className="grid grid-cols-3 gap-2 sm:gap-6 place-items-center place-content-start p-4">
          <div className="col-start-1 col-span-2">
            {renderPostContent({
              post,
              user,
              shortText,
              littleShorterText,
              tag,
              CreateSavedPost,
              isSaved,
              setOpen,
            })}
          </div>
          <div className="flex items-center justify-center col-start-3  w-full h-full overflow-hidden">
            <img
              src={firstImage}
              alt=""
              className="w-20 h-20  object-cover sm:h-40 sm:w-40"
            />
          </div>
        </div>
      ) : (
        <div className="p-4">
          {renderPostContent({
            post,
            user,
            shortText,
            littleShorterText,
            tag,
            CreateSavedPost,
            isSaved,
            setOpen,
          })}
        </div>
      )}
      <Separator />
    </div>
  );
};

export default Posts;

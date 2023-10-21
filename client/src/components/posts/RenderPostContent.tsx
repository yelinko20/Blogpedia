import { Link } from "react-router-dom";
import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import { PostProps, UserProps } from "@/types/types";
import { truncateText } from "@/utils/truncateText";
import { Icons } from "@/icons/icons";
import { QueryKeys } from "@/constants/query-keys";
import DeleteAndUpdatePost from "../DeleteAndUpdatePost";

type RenderPostContentProps = {
  post: PostProps;
  user: UserProps | null;
  shortText: string;
  littleShorterText: string;
  tag: string;
  CreateSavedPost: UseMutateFunction<
    unknown,
    unknown,
    {
      postId: string;
      userId: string;
    },
    unknown
  >;
  isSaved: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function renderPostContent({
  post,
  user,
  shortText,
  littleShorterText,
  tag,
  CreateSavedPost,
  isSaved,
  setOpen,
}: RenderPostContentProps) {
  const shortTitle = truncateText(post.title, 10, 50);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();

  // Check if the post is saved by the user
  const isSavedPost =
    user && user.savedPosts.some((savedPost) => savedPost.postId === post.id);

  const handleSaveClick = () => {
    if (isSavedPost) {
      setOpen(true);
    } else {
      CreateSavedPost({ postId: post.id, userId: user!.id });
      queryClient.invalidateQueries([QueryKeys.GetUser]);
    }
  };

  return (
    <>
      <Link
        to={`/post/${post.title
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")}-${post.id}`}
        key={post.title}
      >
        <div className="text-xl font-bold hidden sm:block">{post.title}</div>
        <div className="sm:text-lg text-sm font-bold md:hidden">
          {shortTitle}
        </div>

        <div className="relative text-sm w-full overflow-clip mt-2 hidden md:block">
          {shortText}
        </div>
        <div className="relative text-sm w-full overflow-clip mt-2 hidden sm:block md:hidden">
          {littleShorterText}
        </div>
      </Link>
      <div className="flex justify-between items-center">
        <span className="text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 mt-2 rounded-full cursor-pointer">
          {tag}
        </span>
        {user?.id !== post.author.id ? (
          <div>
            {isSavedPost || isSaved ? (
              <Icons.bookmarkMinus
                style={{ width: 24, height: 24 }}
                className="text-muted-foreground hover:text-primary cursor-pointer"
                onClick={handleSaveClick}
              />
            ) : (
              <Icons.bookmarkPlus
                style={{ width: 24, height: 24 }}
                className="text-muted-foreground hover:text-primary cursor-pointer"
                onClick={handleSaveClick}
              />
            )}
          </div>
        ) : (
          <DeleteAndUpdatePost postId={post.id} />
        )}
      </div>
    </>
  );
}

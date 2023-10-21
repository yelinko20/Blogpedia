import { Link, useParams } from "react-router-dom";

import { getSinglePost } from "@/api/posts/fetch";
import EditorOutput from "@/components/EditorOutput";
import FormatTime from "@/utils/formatTime";
import { useQuery } from "@tanstack/react-query";
import PostDetailLoading from "@/loading/PostDetailLoading";

export default function PostDetailsPage() {
  const { postname } = useParams();

  const regex =
    /([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/g;
  const matches = postname?.match(regex);
  const postId = matches && matches[0]; // Use conditional assignment

  const {
    isLoading,
    isSuccess,
    data: post,
  } = useQuery({
    queryFn: () => getSinglePost(postId as string),
    queryKey: ["get-single-post", postId],
  });

  const author = post?.author;
  const username = author?.profile?.username;
  const splitName = author?.name.charAt(0);

  const publishTimeOrDate = FormatTime(post?.publishedAt);

  if (isLoading) {
    return <PostDetailLoading />;
  }

  return (
    <div className="mx-auto max-w-2xl mb-8">
      {isSuccess && (
        <div>
          <div className="md:text-5xl text-3xl font-semibold mb-6">
            {post.title}
          </div>
          <div className="flex items-center gap-2 mb-6" key={post.id}>
            <Link to={`/profile/${username}`}>
              {author?.profile.image ? (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={author.profile.image}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div
                  className="w-10 h-10 rounded-full text-2xl flex justify-center items-center"
                  style={{
                    backgroundColor: author?.profile.bgColor || "",
                    color: "white",
                  }}
                >
                  {splitName}
                </div>
              )}
            </Link>
            <Link to={`/profile/${username}`} className="text-lg text-primary">
              {author?.name}
            </Link>
            <p className="text-sm text-muted-foreground">{publishTimeOrDate}</p>
          </div>
          <div className="relative  w-full prose">
            <EditorOutput content={post.content} />
          </div>
        </div>
      )}
    </div>
  );
}

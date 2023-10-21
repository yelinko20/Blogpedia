import { getSearchPost } from "@/api/posts/fetch";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hook";
import { PostProps } from "@/types/types";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import FormatTime from "@/utils/formatTime";
import { Link } from "react-router-dom";

export default function AutoCompleteSearchBox({
  className,
}: {
  className?: string;
}) {
  const { query } = useAppSelector((state) => state.query);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [showCard, setShowCard] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSearchPost(query!);
      setPosts(data.slice(0, 3)); // Limit to the first 3 posts
      setShowCard(data.length > 0);
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    // Add event listener to listen for clicks outside the Card
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowCard(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={className}>
      {showCard && posts.length > 0 ? (
        <div ref={cardRef}>
          <Card className={cn("max-w-[600px]")}>
            <CardContent className="grid gap-4">
              <div>
                {posts.map((post) => {
                  const publishTimeOrDate = FormatTime(post?.publishedAt);

                  return (
                    <Link
                      to={`/post/${post.title
                        .toLowerCase()
                        .replace(/[^a-zA-Z0-9]+/g, "-")
                        .replace(/^-+|-+$/g, "")}-${post.id}`}
                      key={post.title}
                    >
                      <div className="mt-4 last:mb-0 last:pb-0">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-6">
                            {post.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {publishTimeOrDate}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

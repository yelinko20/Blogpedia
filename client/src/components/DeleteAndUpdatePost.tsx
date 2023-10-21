import { useState } from "react";
import { MoreVertical, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/api/posts/fetch";
import { QueryKeys } from "@/constants/query-keys";
import AlertModal from "@/components/modal/alert-modal";

export default function DeleteAndUpdatePost({ postId }: { postId: string }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: DeletePost } = useMutation({
    mutationFn: async ({ postId }: { postId: string }) => {
      setLoading(true);
      await deletePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DeletePost],
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GetAllPosts] });
      setLoading(false);
      toast.success("post deleted!");
    },
    onError: () => {
      toast.error("something went wrong!");
    },
  });

  function onConfirm() {
    DeletePost({ postId });
  }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        title="Are you sure?"
        description="This action can delete your post forever"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" /> Update
        </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

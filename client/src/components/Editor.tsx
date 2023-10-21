import * as z from "zod";
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Globe, Lock } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

import EditorJS from "@editorjs/editorjs";
import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { postValidator } from "@/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserAuth } from "@/context/UserContextProvider";
import { UserContextType } from "@/types/types";
import ImageUpload from "@/api/imageUpload";
import TagModal from "./modal/tag-modal";
import { QueryKeys } from "@/constants/query-keys";
import { useQueryClient } from "@tanstack/react-query";

type formSchemaProps = z.infer<typeof postValidator>;

export const Editor = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth() as UserContextType;
  const queryClient = useQueryClient();

  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<formSchemaProps>({
    resolver: zodResolver(postValidator),
    defaultValues: {
      title: "",
      authorId: user?.id,
      published: isPublished,
      content: "",
      tags,
    },
  });

  function handleInputTagChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const trimmedTag = inputValue.trim();
      if (!tags.includes(trimmedTag) && tags.length < 10) {
        const updatedTags = [...tags, trimmedTag];
        setTags(updatedTags);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setValue("tags", updatedTags);
      }
      if (tags.length === 10) {
        toast.error("Accepted only 10 tags");
      }
      setInputValue("");
    }
  }

  function handleRemoveTag(removedTag: string) {
    const updatedTags = tags.filter((tag) => tag !== removedTag);
    setTags(updatedTags);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setValue("tags", updatedTags);
  }

  const togglePublishStatus = () => {
    setIsPublished((prevIsPublished) => !prevIsPublished);
  };

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;
    // const Quote = (await import("@editorjs/quote")).default();

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: {
            class: Header,
            config: {
              levels: [4, 5, 6],
              defaultLevel: 5,
            },
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          // quote: Quote,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const data = await ImageUpload(file);
                  return {
                    success: 1,
                    file: {
                      url: data.secure_url,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [_key, value] of Object.entries(errors)) {
        toast.error((value as { message: string }).message);
      }
    }
  }, [errors]);

  async function onSubmit(values: formSchemaProps) {
    const blocks = await ref.current?.save();
    const updatedValues = {
      ...values,
      published: isPublished,
      content: blocks,
    };
    try {
      await axiosInstance.post("/api/v1/posts", updatedValues);
      toast.success("Post created successfully!");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GetAllPosts],
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error!.response.data.error);
    } finally {
      setIsModalOpen(false);
      navigate("/");
    }
  }

  const { ref: titleRef, ...rest } = register("title");

  function openModal() {
    if (_titleRef.current?.value) {
      setIsModalOpen(true); // Open the modal if the fields are not empty
    } else {
      toast.error("Please add title and content");
    }
  }

  return (
    <div className="max-w-[800px] mx-auto p-4  dark:bg-background rounded-lg  relative ">
      <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none pr-4"
          />
          <div id="editor" className="min-h-[500px]"></div>

          <div className="absolute top-4 right-4">
            <button
              type="button"
              onClick={togglePublishStatus}
              className="p-2 bg-transparent border-none outline-none rounded-md cursor-pointer"
            >
              {isPublished ? <Globe size={20} /> : <Lock size={20} />}
            </button>
          </div>

          <p className="text-sm text-gray-500 hidden md:block">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
        <div className="absolute bottom-4 right-4 flex flex-row gap-4">
          <Button
            variant="outline"
            type="button"
            className="select-none"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button className="select-none" type="button" onClick={openModal}>
            Continue
          </Button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="relative z-10 p-4 rounded-lg shadow-lg dark:border dark:border-muted-foreground max-w-md mx-auto w-full">
              <TagModal
                inputValue={inputValue}
                tags={tags}
                handleInputTagChange={handleInputTagChange}
                handleKeyDown={handleKeyDown}
                handleRemoveTag={handleRemoveTag}
                isSubmitting={isSubmitting}
                closeModal={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

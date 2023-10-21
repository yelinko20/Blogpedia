export type UserProps = {
  id: string;
  name: string;
  userImage?: string;
  email: string;
  password: string;
  profile: ProfileProps;
  posts: PostProps[];
  savedPosts: SavedPostProps[];
};

export type ProfileProps = {
  id: string;
  username: string;
  bio: string;
  image: string;
  bgColor: string;
  user: UserProps;
  posts: PostProps[];
};

export type UserWithTokenAndProfileProps = {
  user: {
    id: string;
    username: string;
    userImage?: string;
    email: string;
    password: string;
    profile: ProfileProps;
  };
  REFRESH_TOKEN: string;
};

export type UserContextType = {
  user: UserProps | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  accessToken: string | undefined;
  setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type PostProps = {
  id: string;
  title: string;
  content: string;
  image: string | null;
  publishedAt: string;
  author: UserProps;
  tags: tagProps[];
};

export type SavedPostProps = {
  id: string;
  userId: string;
  postId: string;
  post: PostProps;
};

type tagProps = {
  name: string;
};

export type FileUploadProps = {
  handleFile: (file: File | undefined) => void;
  displayImage?: boolean;
  defaultImageURL?: string | null;
};

export type PostImage = {
  id: string;
  url: string;
  createdAt: strings;
};

// import * as z from "zod";

// export const ProfilePropsSchema = z.object({
//   id: z.string(),
//   username: z.string(),
//   bio: z.string(),
//   image: z.string(),
//   bgColor: z.string(),
// });

// export const UserPropsSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   userImage: z.string().optional(),
//   email: z.string(),
//   password: z.string(),
//   profile: ProfilePropsSchema,
// });

// export const UserWithTokenAndProfilePropsSchema = z.object({
//   user: UserPropsSchema,
//   REFRESH_TOKEN: z.string(),
// });

// export const UserContextTypeSchema = z.object({
//   user: UserPropsSchema.nullable(),
//   isLoading: z.boolean(),
//   isError: z.boolean(),
// });

// export const PostPropsSchema = z.object({
//   id: z.string(),
//   title: z.string(),
//   content: z.string(),
//   image: z.string().nullable(),
//   publishedAt: z.string(),
//   author: UserPropsSchema,
//   tags: z.array(z.string()),
// });

// export const FileUploadPropsSchema = z.object({
//   handleFile: z.function(
//     z.tuple([z.union([z.instanceof(File), z.undefined()])])
//   ),
//   displayImage: z.boolean().optional(),
//   defaultImageURL: z.string().nullable().optional(),
// });

// export const PostImageSchema = z.object({
//   id: z.string(),
//   url: z.string(),
//   createdAt: z.string(),
// });

// // Inferred types
// export type ProfileProps = z.infer<typeof ProfilePropsSchema>;
// export type UserProps = z.infer<typeof UserPropsSchema>;
// export type UserWithTokenAndProfileProps = z.infer<
//   typeof UserWithTokenAndProfilePropsSchema
// >;
// export type UserContextType = z.infer<typeof UserContextTypeSchema>;
// export type PostProps = z.infer<typeof PostPropsSchema>;
// export type FileUploadProps = z.infer<typeof FileUploadPropsSchema>;
// export type PostImage = z.infer<typeof PostImageSchema>;

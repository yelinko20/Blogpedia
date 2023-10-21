import axiosInstance from "@/api/axiosInstance";
import { PostProps, UserProps } from "@/types/types";

export async function getAllPublishedPosts(): Promise<PostProps[]> {
  try {
    const res = await axiosInstance.get("/api/v1/published-posts", {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res.data;
    } else {
      console.log("faild");
      throw new Error("Request failed");
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occured!");
  }
}

export async function getAllPostsByUsername(
  username: string
): Promise<UserProps> {
  try {
    const res = await axiosInstance.get(
      "/api/v1/username-posts?username=" + username,
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      return res.data;
    } else {
      console.log("faild");
      throw new Error("Request failed");
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occured!");
  }
}

export async function getSinglePost(postId: string): Promise<PostProps> {
  try {
    const res = await axiosInstance.get("/api/v1/posts/" + postId, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res.data;
    } else {
      console.log("faild");
      throw new Error("Request failed");
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occured!");
  }
}

export async function getSearchPost(query: string): Promise<PostProps[]> {
  try {
    const res = await axiosInstance.get("/api/v1/post/tag?tagName=" + query, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res.data;
    } else {
      console.log("faild");
      throw new Error("Request failed");
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occured!");
  }
}

export async function createPost(data: PostProps): Promise<PostProps> {
  try {
    const res = await axiosInstance.post("/api/v1/post", data, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res.data;
    } else {
      console.log("faild");
      throw new Error("Request failed");
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occured!");
  }
}

export async function deletePost(postId: string) {
  try {
    await axiosInstance.delete("/api/v1/posts/" + postId);
  } catch (error) {
    console.log(error);
  }
}

import axiosInstance from "@/api/axiosInstance";
import { SavedPostProps } from "@/types/types";

export async function createSavedPost(postId: string, userId: string) {
  try {
    const res = await axiosInstance.post("/api/v1/savedPosts", {
      postId,
      userId,
    });

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred!");
  }
}

export async function getAllSavedPosts(
  userId: string
): Promise<SavedPostProps[]> {
  try {
    const res = await axiosInstance.get("/api/v1/savedPosts/" + userId);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred!");
  }
}

export async function deleteSavedPost(id: string) {
  try {
    await axiosInstance.delete("/api/v1/savedPosts/" + id);
  } catch (error) {
    console.log(error);
  }
}

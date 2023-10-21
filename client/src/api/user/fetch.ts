import axiosInstance from "@/api/axiosInstance";
import { ProfileProps, UserProps } from "@/types/types";

async function getLoggedInUser(): Promise<UserProps> {
  try {
    const res = await axiosInstance.get("/api/auth/user", {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res.data; // Return the user data on success
    } else {
      throw new Error("Request failed"); // Throw an error for non-200 status codes
    }
  } catch (error) {
    throw new Error("An  error occurred"); // Handle and display the error
    // Rethrow the error to propagate it further if needed
  }
}

async function getUserProfile(username: string): Promise<ProfileProps> {
  try {
    const res = await axiosInstance.get(`/api/v1/profile/${username}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Request failed");
    }
  } catch (error) {
    throw new Error("An error occured!");
  }
}

export { getLoggedInUser, getUserProfile };

import axiosInstance from "@/api/axiosInstance";

async function ImageUpload(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await axiosInstance.post("/api/editor/upload", formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export default ImageUpload;

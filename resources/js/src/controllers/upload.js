import axiosInstance from "../axiosConfig";
import { toast } from "react-toastify";
export default async function uploadFile(file) {
  const result = { success: false, file_location: "", error: "" };
  const formData = new FormData();
  formData.append("file", file);

  // Check if the file size is less than 2MB (2 * 1024 * 1024 bytes)
  if (file.size > 2 * 1024 * 1024) {
    toast.error("File size is too large (maximum size is 2MB).");
    return result;
  }
  // console.log(formData);

  try {
    const response = await axiosInstance.post("/upload ", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.success) {
      result["success"] = true;
      result["file_location"] = response.data.file_location;
    }
  } catch (error) {
    // console.log(error);
    if (error.response && error.status === 413) {
      toast.error("File size too large");
    }
    console.error("An error occurred:", error);
    result["error"] = error.message;
  }
  return result;
}

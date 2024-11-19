import axios from "axios";

export const  imageUpload = async (file: any) =>{

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ihmuumom");

    try {
      const response: any = await axios.post(
        "https://api.cloudinary.com/v1_1/dob4xgkfg/image/upload",
        formData
      );

      return response
    } catch (error) {
        console.error(error);
        return error
    }
}
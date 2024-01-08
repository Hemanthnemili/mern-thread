import { useState } from "react";
import useShowToast from "./useShowToast";

function usePreviewImg() {
  const [imgUrl, setImgUrl] = useState(null);
  const toast = useShowToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      toast("Invalid file type", "Please select an image file", "Error");
    }
  };

  return { handleImageChange, imgUrl };
}

export default usePreviewImg;

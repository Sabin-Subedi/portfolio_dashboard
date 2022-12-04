import React, { useCallback, useState } from "react";
import { firebase } from "../firebase/firebase";

function useFirebaseStorage({}) {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState({ code: null, message: null });
  const [data, setData] = useState();
  const [imgUrl, setImgUrl] = useState(null);

  const fire = useCallback(async (file, folder) => {
    setError({ code: null, message: null });
    setData(null);
    setLoading(true);
    try {
      const snapshot = await firebase.uploadFileBlob(file, file.name, folder);
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setUploadProgress(progress);

      snapshot.state === "success" && setImgUrl(snapshot.ref.fullPath);
      setData({ url });
    } catch (error) {
      console.log(error.name);
      setError({ code: error.code, message: error.message });
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data, fire };
}

export default useFirebaseStorage;

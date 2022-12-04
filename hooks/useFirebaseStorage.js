import React, { useCallback, useState } from "react";
import { firebase } from "../firebase/firebase";

function useFirebaseStorage({}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ code: null, message: null });

  const fire = useCallback(async (file, folder) => {
    setError({ code: null, message: null });
    setData(null);
    setLoading(true);
    try {
      const response = await firebase.uploadFileBlob(file, folder);
      const url = await firebase.downloadFileUrl(response.ref);
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

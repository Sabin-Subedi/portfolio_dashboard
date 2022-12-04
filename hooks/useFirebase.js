import { FirebaseError } from "firebase/app";
import React, { useCallback, useState } from "react";

function useFirebase({ firebaseFunc }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ code: null, message: null });
  const [data, setData] = useState(null);

  const fire = useCallback(
    async (values) => {
      setError({ code: null, message: null });
      setData(null);
      setLoading(true);
      try {
        const response = await firebaseFunc(values);
        setData(response);
      } catch (error) {
        console.log(error.name);
        setError({ code: error.code, message: "Invalid Credentials" });
      } finally {
        setLoading(false);
      }
    },
    [firebaseFunc]
  );

  return { loading, error, data, fire };
}

export default useFirebase;

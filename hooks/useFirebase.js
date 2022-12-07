import { useCallback, useState } from "react";
import toast from "react-hot-toast";

function useFirebase({ firebaseFunc, toastError = false }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ code: null, message: null });
  const [data, setData] = useState(null);

  const fire = useCallback(
    async (...values) => {
      setError({ code: null, message: null });
      setData(null);
      setLoading(true);
      try {
        const response = await firebaseFunc(...values);
        setData(response);
      } catch (error) {
        toastError && toast.error(error.message);
        setError({ code: error.code, message: error.message });
      } finally {
        setLoading(false);
      }
    },
    [firebaseFunc, toastError]
  );

  return { loading, error, data, fire };
}

export default useFirebase;

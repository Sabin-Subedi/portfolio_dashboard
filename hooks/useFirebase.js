import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

function useFirebase({
  firebaseFunc,
  toastError = false,
  customErrorMessage = null,
  onSuccess,
  onFailure,
  onDone,
  autoFire = false,
  fireValues,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ code: null, message: null });
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  const fire = useCallback(
    async (...values) => {
      setError({ code: null, message: null });
      setData(null);
      setLoading(true);
      setSuccess(false);
      try {
        const response = await firebaseFunc(...values);
        setData(response);
        onSuccess && onSuccess(response);
        setSuccess(true);
      } catch (error) {
        const errorMessage = customErrorMessage || error.message;

        toastError && toast.error(errorMessage);
        onFailure && onFailure(error);
        setError({ code: error.code, message: errorMessage });
      } finally {
        setLoading(false);
        onDone && onDone();
      }
    },

    [firebaseFunc, toastError, customErrorMessage, onSuccess, onDone, onFailure]
  );

  useEffect(() => {
    if (autoFire) {
      fire(...fireValues);
    }
  }, [autoFire, fire, fireValues]);

  return { loading, error, data, fire, success };
}

export default useFirebase;

import { useRouter } from "next/router";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Loader from "../components/Loader";
import { AppContext } from "../context";
import { LOGIN_USER } from "../context/actions";
import { firebase } from "../firebase/firebase";

function WithOauthState({ children }) {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useContext(AppContext);

  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const { user, loggedIn } = await firebase.oauthStateChange();

      if (user && loggedIn) {
        dispatch({
          type: LOGIN_USER,
          payload: user,
        });
      } else {
        !router.asPath.includes("/login") && router.push("/login");
      }
    } catch (err) {
      router.push("/login");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, router]);

  useLayoutEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <Loader />;
  }

  return children;
}

export default WithOauthState;

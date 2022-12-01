import React, { useCallback, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AppContext } from "../context";
import { firebase } from "../firebase/firebase";

function WithOauthState({ children }) {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useContext(AppContext);
  useEffect(() => {}, []);

  const checkAuth = useCallback(async () => {
    try {
      const { user, loggedIn } = await firebase.oauthStateChange();

      if (user && loggedIn) {
        dispatch({
          type: LOGIN_USER,
          payload: user,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <Loader />;
  }

  return children;
}

export default WithOauthState;

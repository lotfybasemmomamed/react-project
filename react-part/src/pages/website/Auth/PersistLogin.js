import axios from "axios";
import { useUserContext } from "../../../context/UserContext";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from '../../../components/Loading'

export default function PersistLogin() {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const cookie = new Cookies();
  const [loading, setLoading] = useState(true);

  const { userContext, setUserContext } = useUserContext();
  const token = userContext.token;
  
  useEffect(() => {
    function refreshToken() {
      const savedToken = cookie.get("Bearer");
      
      if (!savedToken) {
        setLoading(false);
        return;
      }
      
      axios
        .post(`${baseUrl}refresh`, null, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${savedToken}`,
          },
        })
        .then((data) => {
          cookie.set("Bearer", data.data.data.token);
          console.log("cookie from refresh", cookie.get('Bearer'));
          setUserContext({
            token: data.data.data.token,
            userDetails: data.data.data.user,
          });
        })
        .catch((error) => {
          console.log("error in refresh token", error);
          cookie.remove("Bearer");
          setUserContext({ token: null, userDetails: null });
        })
        .finally(() => setLoading(false));
    }
    
    const savedToken = cookie.get("Bearer");
    if (savedToken && !token) {
      setUserContext({
        token: savedToken,
        userDetails: userContext.userDetails,
      });
      setLoading(false);
    } else if (!token) {
      refreshToken();
    } else {
      setLoading(false);
    }
  }, []);
  
  return loading ? <Loading /> : <Outlet />;
}

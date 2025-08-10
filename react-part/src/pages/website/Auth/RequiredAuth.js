import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";
import Cookies from 'universal-cookie';
export default function RequiredAuth() {
  const { userContext } = useUserContext();
  const location = useLocation();
  const cookie = new Cookies()

  console.log("userContext inside RequiredAuth:", userContext);
  return cookie.get('Bearer') ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}

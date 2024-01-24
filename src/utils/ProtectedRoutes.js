import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"; // Don't forget to import useLocation

const ProtectedRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

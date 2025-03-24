import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = sessionStorage.getItem("adminLoggedIn");

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

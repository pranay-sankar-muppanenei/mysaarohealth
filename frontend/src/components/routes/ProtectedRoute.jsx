import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  /*const doctor = localStorage.getItem("doctor");

  if (!doctor) {
    return <Navigate to="/login" replace />;
  }*/

  return children;
};

export default ProtectedRoute;

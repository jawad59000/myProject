import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, auth }) => {
  console.log(auth);
  if (!auth) {
    // If user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({
  element,
  isAdminRequired = false,
  isUserRoute = false,
}: {
  element: any;
  isAdminRequired?: boolean;
  isUserRoute?: boolean;
}) => {
  const { user, token } = useAuthStore();

  console.log("Proted user : ", user);
  console.log("Proted token : ", token);

  if (user === undefined || token === undefined) {
    return <p>Loading...</p>;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // if(!token && user.role !== "customer") {
  //     return <Navigate to='/' replace />
  // }

  if (isAdminRequired && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  if(isUserRoute && user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return element;
};

export default ProtectedRoute;

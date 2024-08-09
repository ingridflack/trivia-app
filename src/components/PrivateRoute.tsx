import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  Component: React.FC;
}

export default function PrivateRoute({
  Component,
  ...props
}: PrivateRouteProps) {
  const userData = localStorage.getItem("userData");

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return <Component {...props} />;
}

import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface PrivateRouteProps {
  Component: React.FC;
}

export default function PrivateRoute({
  Component,
  ...props
}: PrivateRouteProps) {
  const { userData } = useAuth();

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return <Component {...props} />;
}

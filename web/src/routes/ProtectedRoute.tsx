import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import type { JSX } from "react";

type ProtectedRouteProps = {
    children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useSelector((state: RootState) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
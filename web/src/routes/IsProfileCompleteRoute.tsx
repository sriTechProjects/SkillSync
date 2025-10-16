import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import type { JSX } from "react";

type IsProfileCompleteRouteProps = {
  children: JSX.Element;
};

export function IsProfileCompleteRoute({ children }: IsProfileCompleteRouteProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  const isProfileComplete =
    user &&
    user.firstName &&
    user.lastName &&
    user.username &&
    user.phoneNumber;

  if (!isProfileComplete) {
    return <Navigate to="/complete-profile" replace />;
  }

  // ✅ just render the actual page when profile is complete
  return children;
}

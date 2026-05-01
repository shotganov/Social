import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@app/hooks";
import { selectToken } from "../model/selectors";

type Props = {
  children: ReactNode;
};

export const PrivateRouter = ({ children }: Props) => {
  const token = useAppSelector(selectToken);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

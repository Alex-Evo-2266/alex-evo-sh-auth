import { Outlet } from "react-router-dom";
import { Skeleton } from "antd";
import { useAuth, usePrivilege } from "./auth.hook";
import type React from "react";

export function PrivilegeGate({ privilege, invalidPage }: { privilege: string, invalidPage: React.ReactNode }) {
  const { loading } = useAuth();
  const allowed = usePrivilege(privilege);

  if (loading) return <Skeleton />;

  if (!allowed) {
    return invalidPage
  }

  return <Outlet />;
}

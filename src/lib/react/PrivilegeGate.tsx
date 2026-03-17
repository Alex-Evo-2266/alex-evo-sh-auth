import { Outlet } from "react-router-dom";
import { useAuth, usePrivilege } from "./auth.hook";
import type React from "react";

export function PrivilegeGate({ privilege, invalidPage, loadingPage }: { privilege: string, invalidPage: React.ReactNode, loadingPage: React.ReactNode }) {
  const { loading } = useAuth();
  const allowed = usePrivilege(privilege);

  if (loading) return loadingPage;

  if (!allowed) {
    return invalidPage
  }

  return <Outlet />;
}

"use client";

import type { JSX } from "react";
import { useRouter } from "next/navigation";

import authService from "@/services/authService";

import Action from "@/components/Action/Action";

const LogoutButton = (): JSX.Element => {
  const router = useRouter();

  async function handleLogout(): Promise<void> {
    await authService.logout();
    router.push("/login");
    router.refresh();
  }

  return (
    <Action
      className="logout-button"
      onClick={() => {
        void handleLogout();
      }}
    >
      Logout
    </Action>
  );
};

export default LogoutButton;

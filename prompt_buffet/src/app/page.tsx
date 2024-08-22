"use client";

import ProtectedPage from "@/features/ProtectedPage/index";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <ProtectedPage>
      <main>{user?.displayName}</main>
    </ProtectedPage>
  );
}

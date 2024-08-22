"use client";

import { useState } from "react";
import { login, logout } from "@/lib/auth";
import { User } from "firebase/auth";

export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async () => {
    try {
      const userCredential = await login();
      setUser(userCredential.user);
      console.log("Logged in user:", userCredential.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      console.log("Logged out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Please log in</h2>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      )}
    </div>
  );
}

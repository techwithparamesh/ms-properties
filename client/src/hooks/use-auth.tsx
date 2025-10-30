"use client";

import React from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

type AuthContextValue = {
  user: User | null;
  signup: (payload: { name: string; email: string; password: string }) => Promise<User>;
  login: (payload: { email: string; password: string }) => Promise<User>;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "dd_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const persist = (u: User | null) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const signup = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    // Call backend API for signup
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Signup failed");
    }
    // After signup, log in the user automatically
    return await login({ email, password });
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    // Call backend API for login
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Login failed");
    }
    const loggedIn: User = {
      id: data.user.id,
      name: data.user.name,
      email,
      role: data.user.role,
    };
    persist(loggedIn);
    return loggedIn;
  };

  const logout = () => persist(null);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

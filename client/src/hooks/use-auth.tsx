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
    // In a real app, call backend. Here we simulate and store locally.
    // For demo, first user is admin, others are regular users
    const role = email === "admin@site.com" ? "admin" : "user";
    const newUser: User = { id: String(Date.now()), name, email, role };
    persist(newUser);
    return newUser;
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    // In a real app, verify credentials. Here we accept any email/password and create a user entry.
    const role = email === "admin@site.com" ? "admin" : "user";
    const loggedIn: User = { id: String(Date.now()), name: email.split("@")[0] || "User", email, role };
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

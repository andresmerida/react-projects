import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import type {IUser, IUserProfile} from "../types";
import {authClient} from "../lib/auth.ts";
import {api} from "../lib/api.ts";

interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  saveProfile: (
    profile: Omit<IUserProfile, "userId" | "updatedAt">,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children } : { children: ReactNode }) {
  const [neonUser, setNeonUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await authClient.getSession();
        if (result && result.data?.user) {
          setNeonUser(result.data.user);
        } else {
          setNeonUser(null);
        }
      } catch (err) {
        setNeonUser(null);
        console.error("Error loading user:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  async function saveProfile(profileData: Omit<IUserProfile, "userId" | "updatedAt">) {
    if (!neonUser) {
      throw new Error("User not authenticated");
    }

    api.saveProfile(neonUser.id, profileData);
  }

  return (
    <AuthContext.Provider value={{ user: neonUser, isLoading, saveProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
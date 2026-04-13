import type {IUserProfile} from "../types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function post(url: string, body: object) {
  const res = await fetch(`${BASE_URL}/api${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(
      (await res.json()).error || "Something went wrong with the POST request",
    );
  }

  return res.json();
}

export const api = {
  saveProfile: (
    userId: string,
    profile: Omit<IUserProfile, "userId" | "updatedAt">,
  )=> {
    post("/profile", { userId, ...profile });
  }
};
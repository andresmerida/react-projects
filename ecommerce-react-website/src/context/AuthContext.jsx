import {createContext, useContext, useState} from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? { email: localStorage.getItem("currentUserEmail") }
      : null
  );

  function signUp(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(user => user.email === email))
      return { success: false, error: "Email already exists" };

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    setUser(newUser);
    return { success: true, message: "User created successfully" };
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) return { success: false, error: "Invalid email or password" };

    localStorage.setItem("currentUserEmail", email);
    setUser({email: email});

    return { success: true, message: "User logged in successfully" };
  }

  function logout() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signUp, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
import {useAuth} from "../context/AuthContext.tsx";
import {Navigate} from "react-router-dom";

export default function Home() {
  const { user, isLoading } = useAuth();

  if (user && !isLoading) {
    return <Navigate to={"/profile"} replace />
  }

  return <h1>Home Page</h1>
}
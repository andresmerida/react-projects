import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import OnBoarding from "./pages/OnBoarding.tsx";
import Profile from "./pages/Profile.tsx";
import Auth from "./pages/Auth.tsx";
import Account from "./pages/Account.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { authClient } from "./lib/auth.ts";
import AuthProvider from "./context/AuthContext.tsx";

function App() {

  return (
    <NeonAuthUIProvider authClient={authClient} defaultTheme={"dark"}>
      <AuthProvider>
        <BrowserRouter>
          <div className={"min-h-screen flex flex-col"}>
            <Navbar/>
            <main className={"flex-1"}>
              <Routes>
                <Route index element={<Home/>} />
                <Route path={"/onboarding"} element={<OnBoarding/>} />
                <Route path={"/profile"} element={<Profile/>} />
                <Route path={"/auth/:pathname"} element={<Auth/>} />
                <Route path={"/account/:pathname"} element={<Account/>} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </NeonAuthUIProvider>
  )
}

export default App

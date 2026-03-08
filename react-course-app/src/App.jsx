import './App.css'
import { Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "./context/AuthContext.js";

function HomePage() {
  const {user} = useContext(AuthContext)

  return (
    <div style={{ padding: "0 1.5rem"}}>
      <h1>Home</h1>
      {
        user.isAuth ? (
          <p>Welcome back, {user.name}!</p>
        ) : (
          <p>You are not logged in. Go to the login page to sign in.</p>
        )
      }
    </div>
  )
}

function ProfilePage() {
  const {user} = useContext(AuthContext)

  return (
    <div style={{ padding: "0 1.5rem"}}>
      <h1>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Here you could show more user info from the context.</p>
    </div>
  )
}

function LoginPage() {
  const [name, setName] = useState("");
  const {user, login} = useContext(AuthContext)

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    login(name);
  }

  return (
    <div style={{ padding: "0 1.5rem"}}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem"}}>
        <label>
          Name:
          <input type="text"
                 placeholder={"Enter your name..."}
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 style={{ marginLeft: "0.5rem"}}
          />
        </label>
        <button type="submit" style={{ marginLeft: "0.5rem"}}>Login</button>
      </form>

      {user.isAuth && <p>User logged in: Welcome {user.name}</p> }
    </div>
  )
}

function App() {
  const [user, setUser] = useState({name: "", isAuth: false})

  function login(name) {
    setUser({name: name, isAuth: true})
  }

  function logout(name) {
    setUser({name: "", isAuth: false})
  }

  return (
    <div>
      <AuthContext.Provider value={{user, login, logout}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={<h1 style={{ padding: "0 1.5rem"}}>404 Page not found</h1>}
          />
        </Routes>
      </AuthContext.Provider>
      <footer>Footer</footer>
    </div>
  )
}

export default App

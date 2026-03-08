import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.js";

export default function Navbar() {
  const {user, logout} = useContext(AuthContext)

  return (
    <header style={{
      padding: "1rem 1.5rem",
      display: 'flex',
      marginBottom: '1rem',
      borderBottom: '1px solid #e5e7eb',
      justifyContent: 'space-between',
    }}>
      <nav style={{ display: 'flex', gap: '1rem'}}>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
      </nav>

      <div>
        {
          user.isAuth ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )
        }
      </div>
    </header>
  )
}
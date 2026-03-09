import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

export default function Navbar() {
  const {user, logout} = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={"/"} className={"navbar-brand"}>
          ShopHub
        </Link>
        <div className={"navbar-links"}>
          <Link to={"/"} className={"navbar-link"}>Home</Link>
          <Link to={"/checkout"} className={"navbar-link"}>Cart</Link>
        </div>
        <div className={"navbar-auth"}>
          {!user ? (
            <div className={"navbar-auth-link"}>
              <Link to={"/auth"} className={"btn btn-secondary"}>
                Login
              </Link>
              <Link to={"/auth"} className={"btn btn-primary"} style={ { marginLeft: "5px" }}>
                Signup
              </Link>
            </div>
          ) : (
            <div className={"navbar-user"}>
              <p className={"navbar-greeting"}>Hi, {user.email}</p>
              <button className={"btn btn-secondary"} onClick={logout}>
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  )
}
import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Checkout from "./pages/Checkout.jsx";
import Navbar from "./components/Navbar.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

function App() {

  return (
    <AuthProvider>
      <div className={"app"}>
        <Navbar/>
        <Routes>
          <Route path={"/"} element={<Home/>} />
          <Route path={"/auth"} element={<Auth/>} />
          <Route path={"/checkout"} element={<Checkout/>} />
          <Route path={"/products/:id"} element={<ProductDetails/>} />
          <Route path={"*"} element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App

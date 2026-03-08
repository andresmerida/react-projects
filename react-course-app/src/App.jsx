import './App.css'
import { Route, Routes, Link } from "react-router-dom";

function HomePage() {
  return <h1>Home Page</h1>
}

function AboutPage() {
  return <h1>About Page</h1>
}

function App() {

  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
      <footer>Footer</footer>
    </div>
  )
}

export default App

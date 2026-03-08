import './App.css'
import {useState} from "react";

function Greeting(props) {
  return <h1>Hello, I am Andres {props.name}</h1>
}

function App() {
  const [showGreeting, setShowGreeting] = useState(false)

  function toggleGreeting() {
    setShowGreeting(prevState => !prevState)
  }
  return (
    <>
      <button onClick={toggleGreeting}>Toggle Greeting</button>
      {showGreeting && <Greeting name={"Andres"}/>}
    </>
  )
}

export default App

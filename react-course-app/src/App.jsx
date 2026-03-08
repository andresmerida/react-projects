import './App.css'
import {useState, useEffect} from "react";

function Counter() {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    console.log("Counter Mounted");

    return () => {
      console.log("Counter Unmounted");
    }
  }, [])

  useEffect(() => {
    console.log("Counter Updated")
  }, [counter])

  return <button onClick={() => setCounter(counter + 1)}>Click me, counter:  {counter}</button>
}

function CleanupExample() {
  const [x, setX] = useState(0)

  useEffect(() => {
    function handleMouseMove(event) {
      setX(event.clientX)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // cleanup runs on unmount or dependency change
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, []);

  return <p>Mouse X: {x}</p>
}

function App() {
  const [showCounter, setShowCounter] = useState(false)

  useEffect(() => {
    console.log("App Mounted");
    async function fetchUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsers();
  }, [])

  return (
    <div>
      <button onClick={() => setShowCounter(!showCounter)}>
        Show Counter
      </button>
      {
        showCounter && <Counter />
      }
      <br/>
      <CleanupExample />
    </div>
  )
}

export default App

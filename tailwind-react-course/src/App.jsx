import {useState} from "react";

function App() {
  const [open, setOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen text-slate-900 dark:text-primary dark:bg-background`}>
      {/* Navbar */}
      <div className={"flex items-center justify-between p-4"}>
        <div className={"font-bold"}>
          Logo
        </div>
        {/* Desktop Nav */}
        <div className={"hidden sm:flex gap-2"}>
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
          <button
            className={"text-xl cursor-pointer"}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
        <button className={"text-xl cursor-pointer sm:hidden"} onClick={() => setOpen(!open)}>
          ...
        </button>
      </div>
      {/* Mobile Nav */}
      { open && (
        <div className={"flex flex-col items-center gap-2 text-slate-900 dark:text-primary dark:bg-background p-4 sm:hidden"}>
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
          <button
            className={"text-xl cursor-pointer sm:hidden"}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      )}

      <div className={"grid sm:grid-cols-2 md:grid-cols-3 text-primary dark:text-primary dark:bg-background p-6 gap-6 text-center font-semibold text-2xl sm:text-sm"}>
        <div className={"bg-slate-500 p-4 rounded hover:bg-slate-600 hover:scale-105"}>
          Feature One
        </div>
        <div className={"bg-slate-500 p-4 rounded hover:bg-slate-600 hover:scale-105"}>
          Feature Two
        </div>
        <div className={"bg-slate-500 p-4 rounded hover:bg-slate-600 hover:scale-105"}>
          Feature Three
        </div>
        <div className={"bg-slate-500 p-4 rounded hover:bg-slate-600 hover:scale-105"}>
          Feature Four
        </div>
        <div className={"bg-slate-500 p-4 rounded hover:bg-slate-600 hover:scale-105"}>
          Feature Five
        </div>
        <div className={"bg-slate-500 p-4 rounded hover:bg-slate-600 hover:scale-105"}>
          Feature Six
        </div>
      </div>
    </div>
  )
}

export default App

import './App.css';
import {Route, Routes} from "react-router";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/NavBar";
import {createContext, useEffect, useState} from "react";
import {darkModeHandler} from "./utils/darkModeHandler";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("displayMode"));

  useEffect(() => {
    if(localStorage.getItem("displayMode") === null) localStorage.setItem("displayMode", "");
    setTheme(localStorage.getItem("displayMode"))
  }, []);

  const toggleTheme = () => {
    darkModeHandler(theme,setTheme)
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className={`flex flex-col ${theme}`}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<RegistrationPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

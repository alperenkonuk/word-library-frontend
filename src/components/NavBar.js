import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {ThemeContext} from "../App";

const Navbar = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <nav
      className="fixed max-w-full py-2 px-5 container top-0 flex justify-between bg-white border-gray-200 dark:bg-gray-900 ">
      <div>
        <h1 className="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">Word Library</h1>
      </div>
      <div>
        <h1 className="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">Word Library</h1>
      </div>
      <div className={`flex flex-row justify-center items-center space-x-2`}>
        <h1 className="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">Profile</h1>
        <div>
          <button className={`min-w-10 text-2xl font-semibold text-gray-700 dark:text-gray-200`}
                  onClick={() => {
                    toggleTheme()
                  }}>
            {theme === "" ? <FontAwesomeIcon icon={faMoon} size="xl"/> : <FontAwesomeIcon icon={faSun} size="xl"/>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

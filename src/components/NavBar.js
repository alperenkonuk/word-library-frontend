import React, {useContext, useEffect, useState} from 'react';
import {darkModeHandler} from "../utils/darkModeHandler";
import {ThemeContext} from "../App";

const Navbar = () => {
  const {theme,toggleTheme} = useContext(ThemeContext);

  return (
    <nav
      className="fixed max-w-full py-2 px-5 container top-0 flex justify-between bg-white border-gray-200 dark:bg-gray-900 ">
      <div>
        <h1 className="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">Word Library</h1>
      </div>
      <div>
        <h1 className="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">Word Library</h1>
      </div>
      <div>
        <div>
          <button onClick={() => {
            toggleTheme();
          }}>Toggle theme</button>
        </div>
        <h1 className="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">Profile</h1>
      </div>
    </nav>
  );
};

export default Navbar;

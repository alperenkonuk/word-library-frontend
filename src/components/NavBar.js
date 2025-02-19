import React, { useState } from 'react';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="fixed max-w-full py-2 px-5 container top-0 flex justify-between bg-white border-gray-200 dark:bg-gray-900 ">
      <div>
        <h1 className="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">Word Library</h1>
      </div>
      <div>
        <h1 className="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">Word Library</h1>
      </div>
      <div>
        <div>

        </div>
        <h1 className="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">Profile</h1>
      </div>
    </nav>
  );
};

export default Navbar;

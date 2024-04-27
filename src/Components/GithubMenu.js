import React, { useState } from "react";

const GitHubMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative flex justify-center">
      <p
        className="text-xl pb-2 hover:font-bold cursor-pointer border-b-2 border-black"
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
      >
        GitHub
      </p>
      {isMenuOpen && (
        <div
          className="absolute z-10 top-full bg-white shadow-lg p-2
          flex flex-col justify-center"
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          <a href="https://github.com/NoHaitch/Tubes2_FE_Chibye"
            className="cursor-pointer hover:bg-gray-200 p-1"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            GitHub Frontend
          </a>
          <a href="https://github.com/NoHaitch/Tubes2_BE_Chibye"
            className="cursor-pointer hover:bg-gray-200 p-1"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            GitHub Backend
          </a>
        </div>
      )}
    </div>
  );
};

export default GitHubMenu;

import React, { useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        className="sr-only peer"
      />
      <div
        className="peer rounded-full outline-none duration-100 after:duration-500 
        w-10 h-5 bg-blue-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500  
        after:content-['No'] after:absolute after:outline-none after:rounded-full after:h-4 after:w-4 
        after:bg-white after:top-0.5 after:left-0.5 after:flex after:justify-center after:items-center  
        after:text-sky-800 after:text-[10px] after:font-bold peer-checked:after:translate-x-5 
        peer-checked:after:content-['Yes'] peer-checked:after:border-white"
      ></div>
    </label>
  );
};

export default ThemeToggle;

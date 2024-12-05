import { useState, useEffect } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function DarkMode() {

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("dark-mode") === "true";
    });

    const toggleTheme = () => { 
        setDarkMode((prev: boolean) => {
            const newTheme = !prev;
            localStorage.setItem('dark-mode', newTheme.toString());
            return newTheme;
        });
    }

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');            
        }
    }, [darkMode]);

    return (
        <label className=" relative inline-block w-16 h-8">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleTheme}
            className="hidden"
          />

          <span className={`block w-full h-full rounded-full transition-all duration-300 ${darkMode ? "bg-blue-200" : "bg-green-300"}`} ></span>

          <span className={`absolute top-1/2 transform -translate-y-1/2 left-1 flex 
                            items-center justify-center w-6 h-6 bg-white rounded-full 
                            shadow-md transition-transform duration-300
                            ${darkMode ? "translate-x-8" : ""}`}
          >
            { darkMode ? 
                <DarkModeIcon className="text-blue-500" fontSize="small" />
              : 
                <LightModeIcon className="text-yellow-400" fontSize="small" /> 
            }
          </span>
        </label>
      );
}
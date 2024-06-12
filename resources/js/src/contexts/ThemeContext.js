import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import { toast } from "react-toastify";
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(null);
  useEffect(() => {
    getThemeBackend();
  }, []);
  const handleChangeTheme = (theme) => {
    updateThemeBackend(theme);
  };

  function getThemeBackend() {
    axiosInstance
      .post("/api/themeandpermissions/get_theme ")
      .then((response) => {
        // console.log(response);
        setSelectedTheme(response.data[0].name);
      })
      .catch((error) => {
        // console.log(error);
        setSelectedTheme("light");
        // toast.error("Error getting theme");
      });
  }
  function updateThemeBackend(newTheme) {
    axiosInstance
      .post("/api/themeandpermissions/update_theme ", {
        name: newTheme,
      })
      .then((response) => {
        // console.log(response);
        setSelectedTheme(newTheme);
        toast.success("Theme Updated Successfully");
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Error updating theme");
      });
  }

  return (
    <ThemeContext.Provider value={{ selectedTheme, handleChangeTheme }}>
      <div data-theme={selectedTheme}>{children}</div>
    </ThemeContext.Provider>
  );
}

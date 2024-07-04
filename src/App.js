import React, { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoutes } from "./router/routes";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "./store/reducers/authReducer";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const theme = useSelector(state => state.theme);
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  useEffect(() => {
    if (theme === "system") {
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDarkMode);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const isDarkTheme =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);

    // Dispatch get_user_info thunk when the application starts
    if (token) {
      dispatch(get_user_info());
    }
  }, [token]); // Ensure to include dispatch and token in the dependency array

  return (
    <div className={isDarkTheme ? "dark" : ""}>
      <Toaster
        toastOptions={{
          position: "top-center",
          style: {
            background: isDarkTheme ? "rgba(55, 65, 81, 0.9)" : "rgba(255, 255, 255, 0.9)",
            color: isDarkTheme ? "#F9FAFB" : "#1F2937",
          },
        }}
      />
      <Router allRoutes={allRoutes} />
    </div>
  );
}

export default App;

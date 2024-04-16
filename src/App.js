import React, { useState } from "react";
import { Box, Button, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/users";
import Form from "./scenes/form";
import Applications from "./scenes/applications";
import Orders from "./scenes/orders";
import FAQ from "./scenes/faq";
import Products from "./scenes/products";
import Ingredients from "./scenes/ingredients";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import LoginForm from "./scenes/Login";

function App() {
  const [theme, colorMode] = useMode();
  const [notifications, setNotifications] = useState([]); // Define notifications state
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // login logic
    setLoggedIn(true);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {loggedIn ? (
            <>
              <Sidebar />
              <main className="content">
                <Topbar setNotifications={setNotifications} />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/applications" element={<Applications />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/ingredients" element={<Ingredients />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                </Routes>
              </main>
            </>
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

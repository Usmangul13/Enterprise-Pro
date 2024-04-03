import React, { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar"
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

function App() {
  const [theme, colorMode] = useMode();
  const [notifications, setNotifications] = useState([]); // Define notifications state

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
          <Topbar setNotifications={setNotifications} /> {/* Pass setNotifications as a prop */}
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
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

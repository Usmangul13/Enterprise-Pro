import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/users";
import Form from "./scenes/form";
import IngredientForm from "./scenes/ingredientform";
import ProductForm from "./scenes/productform";
import Applications from "./scenes/applications";
import Orders from "./scenes/orders";
import FAQ from "./scenes/faq";

import Products from "./scenes/products";
import Ingredients from "./scenes/ingredients";

import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Login from "./scenes/Login"; // Import the Login component

function App() {
  const [theme, colorMode] = useMode();
  const [notifications, setNotifications] = useState([]);
  const [userLogins, setUserLogins] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    // Check if user is logged in on component mount
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
    } else{
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", false);
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('http://localhost:3007/getloginUsers');
      if (!response.ok) {
        throw new Error('Error fetching products');
      }

      const data = await response.json();
      setUserLogins(data);
    } catch (error) {
      console.error(error);
    }
};

useEffect(() => {
    fetchUserDetails();
}, []);

const checkDetails = (username, password) => {
    for (let user of userLogins) {
        if(user.Username == username && user.Password == password){
            return true;
        }
    }
    return false;
}

  // Function to handle login
  const handleLogin = (username, password) => {
    // Implement login logic here (e.g., API call, validation)
    // If login is successful, set isLoggedIn to true and store in local storage
    let found = checkDetails(username, password);
    if(found){
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
    } else{
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", false);
    }
    
  };

  // Function to handle logout
  const handleLogout = () => {
    // Implement logout logic here
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoggedIn ? (
            <Login onLogin={handleLogin} loggedInProps={isLoggedIn}/> // Render Login component if not logged in
          ) : (
            <>
              <Sidebar />
              <main className="content">
                <Topbar
                  setNotifications={setNotifications}
                  onLogout={handleLogout}
                />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/ingredientform" element={<IngredientForm />} />
                  <Route path="/productform" element={<ProductForm />} />
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
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

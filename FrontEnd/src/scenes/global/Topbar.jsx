import React, { useState, useEffect } from "react";
import { Box, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import { mockDataProducts, mockDataIngredients } from "../../data/mockData";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = ({onLogout}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
      

    const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:3007/getProducts');
          if (!response.ok) {
            throw new Error('Error fetching products');
          }

          const data = await response.json();
          console.log(data[1]);

          setProducts(data);
          setIsLoading(false); 
        } catch (error) {
          console.error(error);
          setError(error.message);
          setIsLoading(false);
        }
      };

    // Define notifications state
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        console.log("useEffect hook is running");
        // Function to display alerts for products
        const displayProductAlerts = (product) => {
            let alertMessages = [];

            // Check for low stock
            if (product.unit < 400) {
                alertMessages.push(`Low stock alert for product: ${product.name}`);
            }

            // Check for expiry
            const expiryDate = new Date(product.expirydate);
            const today = new Date();
            const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
            if (daysUntilExpiry <= 60 && daysUntilExpiry > 0) {
                alertMessages.push(`Expiry alert for product: ${product.name}`);
            }

            // Add alerts to notifications array
            if (alertMessages.length > 0) {
                setNotifications((prevNotifications) => {
                    const uniqueNotifications = new Set([...prevNotifications, ...alertMessages]);
                    return Array.from(uniqueNotifications);
                });
            }
        };

        // Call displayAlerts function for each product
        mockDataProducts.forEach((product) => displayProductAlerts(product));

        // Function to display alerts for ingredients
        const displayIngredientAlerts = (ingredient) => {
            let alertMessages = [];

            // Check for low quantity
            if (ingredient.quantity < 40) {
                alertMessages.push(`Low quantity alert for ingredient: ${ingredient.name}`);
            }

            // Check for expiry
            const expiryDate = new Date(ingredient.expirydate);
            const today = new Date();
            const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
            if (daysUntilExpiry <= 60 && daysUntilExpiry > 0) {
                alertMessages.push(`Expiry alert for ingredient: ${ingredient.name}`);
            }

            // Add alerts to notifications array
            if (alertMessages.length > 0) {
                setNotifications((prevNotifications) => {
                    const uniqueNotifications = new Set([...prevNotifications, ...alertMessages]);
                    return Array.from(uniqueNotifications);
                });
            }
        };

        // Call displayAlerts function for each ingredient
        mockDataIngredients.forEach((ingredient) => displayIngredientAlerts(ingredient));
    }, []); // Empty dependency array to ensure this effect runs only once

    const handleBellIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // Function to handle logout
    const handleLogout = () => {
        // Implement logout logic here
        // For now, just remove the isLoggedIn status from local storage and update state
        localStorage.setItem("isLoggedIn", false);
        onLogout();
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton onClick={handleBellIconClick}>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleLogout}>
                    <PersonOutlinedIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    {notifications.map((notification, index) => (
                        <MenuItem key={index} onClick={handleCloseMenu}>
                            {notification}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>);
};

export default Topbar;
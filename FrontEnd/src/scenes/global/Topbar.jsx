import React, { useState, useEffect } from "react";
import { Box, IconButton, Menu, MenuItem, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = ({ onLogout }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [products, setProducts] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3007/getProducts');
                if (!response.ok) {
                    throw new Error('Error fetching products');
                }
                const data = await response.json();
                console.log("Fetched products:", data); // Add this line
                setProducts(data);
                setIsLoading(false);
                checkProductAlerts(data);
            } catch (error) {
                console.error(error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        const fetchIngredients = async () => {
            try {
                const response = await fetch('http://localhost:3007/getIngredients');
                if (!response.ok) {
                    throw new Error('Error fetching ingredients');
                }
                const data = await response.json();
                setIngredients(data);
                setIsLoading(false);
                checkIngredientAlerts(data);
            } catch (error) {
                console.error(error);
                setError(error.message);
                setIsLoading(false);
            }
        };
        const checkProductAlerts = (products) => {
            products.forEach(product => {
                if (product.QuantityAvailable < 800) { // Changed 'quantity' to 'QuantityAvailable'
                    setNotifications(prevNotifications => [...prevNotifications, `Low stock alert for product: ${product.ProductName}`]); // Changed 'name' to 'ProductName'
                }
        
                const expiryDate = new Date(product.ExpiryDate); // Changed 'expirydate' to 'ExpiryDate'
                const today = new Date();
                const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
                if (daysUntilExpiry <= 600 && daysUntilExpiry > 0) {
                    setNotifications(prevNotifications => [...prevNotifications, `Expiry alert for product: ${product.ProductName}`]); // Changed 'name' to 'ProductName'
                }
            });
        };
        
        const checkIngredientAlerts = (ingredients) => {
            ingredients.forEach(ingredient => {
                if (ingredient.QuantityAvailable < 800) { // Changed 'quantity' to 'QuantityAvailable'
                    setNotifications(prevNotifications => [...prevNotifications, `Low quantity alert for ingredient: ${ingredient.IngredientName}`]); // Changed 'name' to 'IngredientName'
                }
        
                const expiryDate = new Date(ingredient.ExpiryDate); // Changed 'expirydate' to 'ExpiryDate'
                const today = new Date();
                const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
                if (daysUntilExpiry <= 600 && daysUntilExpiry > 0) {
                    setNotifications(prevNotifications => [...prevNotifications, `Expiry alert for ingredient: ${ingredient.IngredientName}`]); // Changed 'name' to 'IngredientName'
                }
            });
        };
        

        fetchProducts();
        fetchIngredients();
    }, []);

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
                            <Typography variant="body2">{notification}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
    );
};

export default Topbar;


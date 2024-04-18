import React, { useState, useEffect } from 'react';
import { Box, IconButton, Snackbar } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Delete, Edit, Close as CloseIcon } from "@mui/icons-material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";

const Ingredients = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch('http://localhost:3007/getIngredients');
                if (!response.ok) {
                    throw new Error('Error fetching ingredients');
                }
                const data = await response.json();
                setIngredients(data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchIngredients();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3007/deleteIngredient/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Error deleting ingredient');
            }

            // Filter out the deleted ingredient from the state
            const updatedIngredients = ingredients.filter(ingredient => ingredient.Ingredient_ID !== id);
            setIngredients(updatedIngredients);
            setMessage('Ingredient deleted successfully');
        } catch (error) {
            console.error(error);
            setMessage('Failed to delete ingredient');
        }
    };
    const handleEdit = (id) => {
        
        console.log("Editing ingredient with ID:", id);
    };


    const handleCloseSnackbar = () => {
        setMessage('');
    };

    const columns = [
        { field: "Ingredient_ID", headerName: "Ingredient ID", flex: 0.5 },
        { field: "SKU_ID", headerName: "SKU ID", flex: 0.5 },
        { field: "IngredientName", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "Quantity", headerName: "Quantity", type: "number", flex: 1 },
        { field: "Size", headerName: "Size", type: "number", flex: 1 },
        { field: "Unit", headerName: "Unit", flex: 1 },
        { field: "ExpiryDate", headerName: "Expiry Date", headerAlign: "left", align: "left" },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
                <Box>
                    <IconButton onClick={() => handleDelete(params.row.Ingredient_ID)}><Delete /></IconButton>
                    <IconButton onClick={() => handleEdit(params.row.Ingredient_ID)}><Edit /></IconButton>
                </Box>
            )
        }
    ];
    
    return (
       
    
    
        <Box m="20px">
            <Header title="INGREDIENTS" subtitle="Ingredients" />
            <Box
                m="40px 0 0 0"
                height="75vph"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: colors.blueAccent[700],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                        borderTop: "none",
                    },
                }}
            >
                <DataGrid rows={ingredients} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box>
            <Snackbar
                open={Boolean(message)}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={message}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Box>
    );
};

export default Ingredients;
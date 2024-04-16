import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";

const Ingredients = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const columns = [
        { field: "Ingredient_ID", headerName: "Ingredient ID", flex: 0.5 },
        { field: "SKU_ID", headerName: "SKU ID", flex: 0.5 },
        { field: "IngredientName", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "Quantity", headerName: "Quantity", type: "number", flex: 1 },
        { field: "Size", headerName: "Size", type: "number", flex: 1 },
        { field: "Unit", headerName: "Unit", flex: 1 },
        { field: "ExpiryDate", headerName: "Expiry Date", headerAlign: "left", align: "left" },
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
        </Box>
    );
};

export default Ingredients;

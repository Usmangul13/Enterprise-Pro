import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";

const Products = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const mockDataProducts = [
        {
            "id": 2,
            "ProductName": "Gluten Free Cracker",
            "Price": 1,
            "Size": 0,
            "Unit": "",
            "QuantityAvailable": 498,
            "Description": "Rakusen’s Gluten Free Crackers are a healthy, versatile choice for a range of toppings.\r\n\r\nTasty, crispy and naturally free from gluten, they are the perfect option for guilt-free snacking.",
            "Category": "Snacks",
            "ExpiryDate": "2025-07-02T23:00:00.000Z"
        }
      ];
      

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

    useEffect(() => {
        fetchProducts();
      }, []);

      const columns = [
        { field: "id", headerName: "SKU ID", flex: 0.5 },
        { field: "ProductName", headerName: "Product Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "Price", headerName: "Price", flex: 1, renderCell: (params) => (
            <Typography color="green" variant="body1">
                ${params.row.Price} {/* Ensure that the field name is correct */}
            </Typography>
        ) },
        { field: "Size", headerName: "Size", type: "number", flex: 1 },
        { field: "Unit", headerName: "Unit", flex: 1 },
        { field: "QuantityAvailable", headerName: "Quantity Available", type: "number", flex: 1 },
        { field: "Description", headerName: "Description", flex: 1 },
        { field: "Category", headerName: "Category", flex: 1 },
        { field: "ExpiryDate", headerName: "Expiry Date", headerAlign: "left", align: "left" },
    ];
    

    return (
        <Box m="20px">
            <Header title= "PRODUCTS" subtitle="Products" />
            <Box
              m="40px 0 0 0"
              height="75vph"
              sx = {{
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
                <DataGrid rows={products} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box>
        </Box>
    );
};

export default Products;
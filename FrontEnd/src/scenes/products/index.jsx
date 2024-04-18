import { Box, Typography, IconButton, Snackbar } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Delete, Edit, Close as CloseIcon } from "@mui/icons-material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";

const Products = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');


    const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:3007/getProducts');
          if (!response.ok) {
            throw new Error('Error fetching products');
          }

          const data = await response.json();
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

    const handleDelete = async (id) => {
      try {
          const response = await fetch(`http://localhost:3007/deleteProduct/${id}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          
          if (!response.ok) {
              throw new Error('Error deleting product');
          }
  
          // Filter out the deleted product from the state
          const updatedProducts = products.filter(product => product.id !== id);
          setProducts(updatedProducts);
          setMessage('Product deleted successfully');
      } catch (error) {
          console.error(error);
          setMessage('Failed to delete product');
      }
  };
    const handleEdit = (id) => {
        
        console.log("Editing product with ID:", id);
    };

    const handleCloseSnackbar = () => {
      setMessage('');
  };
  
    const columns = [
        { field: "id", headerName: "SKU ID", flex: 0.5 },
        { field: "ProductName", headerName: "Product Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "Price", headerName: "Price", flex: 1, renderCell: (params) => (
            <Typography color="green" variant="body1">
                £{params.row.Price}
            </Typography>
        ) },
        { field: "Size", headerName: "Size", type: "number", flex: 1 },
        { field: "Unit", headerName: "Unit", flex: 1 },
        { field: "QuantityAvailable", headerName: "Quantity Available", type: "number", flex: 1 },
        { field: "Description", headerName: "Description", flex: 1 },
        { field: "Category", headerName: "Category", flex: 1 },
        { field: "ExpiryDate", headerName: "Expiry Date", headerAlign: "left", align: "left" },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
                <Box>
                    <IconButton onClick={() => handleDelete(params.row.id)}><Delete /></IconButton>
                    <IconButton onClick={() => handleEdit(params.row.id)}><Edit /></IconButton>
                </Box>
            )
        }
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

export default Products;
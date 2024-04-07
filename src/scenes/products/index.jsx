import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataProducts } from "../../data/mockData";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";

const Products = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        {field: "id", headerName: "SKU ID", flex: 0.5 },
        {field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        {field: "price", headerName: "Price", flex: 1, renderCell: (params) => (
            <Typography color={colors.greenAccent[500]}>
                ${params.row.price}
            </Typography>
        ) },
        {field: "size", headerName: "Size", type: "number", flex: 1},
        {field: "unit", headerName: "Unit", type: "number", flex: 1},
        {field: "expirydate", headerName: "Expiry Date", headerAlign: "left", align: "left" },
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
                <DataGrid rows={mockDataProducts} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box>
        </Box>
    );
};

export default Products;
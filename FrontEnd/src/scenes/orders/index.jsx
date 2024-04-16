import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataOrders } from "../../data/mockData";
import Header from "../../components/Header";

const Orders = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        {field: "id", headerName: "ID" },
        {field: "vendorid", headerName: "Vendor Name", flex: 1, cellClassName: "name-column--cell" },
        {field: "quantity", headerName: "Quantity", flex: 1 },
        {field: "orderdate", headerName: "Order Date", flex: 1 },
        {field: "totalamount", headerName: "Total Amount", flex: 1, renderCell: (params) => (
            <Typography color={colors.greenAccent[500]}>
                ${params.row.totalamount}
            </Typography>
        ) },
        
    ];

    return (
        <Box m="20px">
            <Header title= "PURCHASE ORDERS" subtitle="Purchase Orders" />
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
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
              }}
            >
                <DataGrid rows={mockDataOrders} columns={columns} checkboxSelection />
            </Box>
        </Box>
    );
};

export default Orders;
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataUsers } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        {field: "id", headerName: "ID" },
        {field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        {field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
        {field: "phone", headerName: "Phone Number", flex: 1 },
        {field: "email", headerName: "Email", flex: 1 },
        {field: "access", headerName: "Access Level", flex: 1, renderCell: ({ row: {access}}) => {
            return (
                <Box
                  width="60%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  backgroundColor={
                    access === "manager"
                     ? colors.greenAccent[600]
                     : colors.greenAccent[700]
                  }
                  borderRadius="4px"
                >
                    {access === "manager" && <AdminPanelSettingsOutlinedIcon />}
                    {access === "staff" && <SecurityOutlinedIcon />}
                    {access === "vendor" && <LockOpenOutlinedIcon />}
                    <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        {access}
                    </Typography>

                </Box>
            )
        } },

    ];

    return (
        <Box m="20px">
            <Header title= "USERS" subtitle="Managing the Users" />
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
                <DataGrid rows={mockDataUsers} columns={columns} checkboxSelection />
            </Box>
        </Box>
    );
};

export default Users;
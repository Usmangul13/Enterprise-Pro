import { Box, Typography, useTheme, IconButton, Snackbar } from "@mui/material";
import { Delete, Edit, Close as CloseIcon } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
//import { mockDataUsers } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';

const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');


    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3007/getUsers');
            if (!response.ok) {
                throw new Error('Error fetching users');
            }

            const data = await response.json();
            setUsers(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setError(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (id) => {

        console.log("Editing users with ID:", id);
    };


    const columns = [
        { field: "id", headerName: "ID" },
        { field: "firstname", headerName: "First Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "lastname", headerName: "Last Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        {field: "access", headerName: "Access Level", flex: 1, renderCell: ({ row: { access } }) => {
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

            }
        },
        {
            field: "actions", headerName: "Actions", flex: 1, renderCell: (params) => (
                <Box>
                    <IconButton onClick={() => handleEdit(params.row.id)}><Edit /></IconButton>
                </Box>
            )
        },

    ];

    return (
        <Box m="20px">
            <Header title="USERS" subtitle="Managing the Users" />
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
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid rows={users} columns={columns} checkboxSelection />
            </Box>
        </Box>
    );
};

export default Users;
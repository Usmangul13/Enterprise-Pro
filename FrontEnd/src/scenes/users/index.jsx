import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import React, { useState, useEffect } from 'react';
//import { mockDataUsers } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

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

    const columns = [
        {field: "id", headerName: "User ID" },
        {field: "Username", headerName: "Username", flex: 1, cellClassName: "name-column--cell" },
        {field: "Password", headerName: "Password", flex: 1 },
        {field: "UserType", headerName: "User type", flex: 1 },
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
                <DataGrid rows={users} columns={columns} checkboxSelection />
            </Box>
        </Box>
    );
};

export default Users;
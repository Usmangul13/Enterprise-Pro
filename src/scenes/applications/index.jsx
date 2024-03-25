import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataApplications } from "../../data/mockData";
import Header from "../../components/Header";

const Applications = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        {field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        {field: "contactinfo", headerName: "Contact Information", flex: 1 },
        {field: "email", headerName: "Email", flex: 1 },         
    ];

    return (
        <Box m="20px">
            <Header title= "APPLICATIONS" subtitle="External Vendor Applications" />
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
                <DataGrid rows={mockDataApplications} columns={columns} checkboxSelection />
            </Box>
        </Box>
    );
};

export default Applications;
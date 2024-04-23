import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';
import React, { useState } from 'react'; // Import useState from React

const initialValues = {
    username: "",
    password: "",
    usertype: "",
};

const userSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
    usertype: yup.string().required("required"),
})

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleFormSubmit = async (values) => {
        setSubmitting(true);
        try {
            // Send a POST request to the backend endpoint
            const response = await axios.post('http://localhost:3007/createusers', values);
            console.log(response.data);
            setSuccessMessage("USERS CREATED SUCCESSFULLY");
            setErrorMessage("");
        } catch (error) {
            console.error('Error creating user:', error);
            setSuccessMessage("");
            setErrorMessage("FAILED TO CREATE USERS");
        } finally {
            setSubmitting(false);
        }
    };
    

    return <Box m="20px">
        <Header title="CREATE USER" subtitle="Create a New User Profile" />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Box 
                        display="grid" 
                        gap="30px" 
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4"},
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            name="username"
                            error={!!touched.username && !!errors.username}
                            helperText={touched.username && errors.username}
                            sx={{ gridColumn: "span 2"}}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={!!touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 2"}}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="User Type"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.usertype}
                            name="usertype"
                            error={!!touched.usertype && !!errors.usertype}
                            helperText={touched.usertype && errors.usertype}
                            sx={{ gridColumn: "span 4"}}
                        />
                        <Box mt={2} p={1} borderRadius={4}>
                                <Typography variant="h6" color="success">
                                    {successMessage}
                                </Typography>
                            </Box>

                            {errorMessage && (
                                <Box mt={2} p={1} borderRadius={4}>
                                    <Typography variant="body1" color="error">
                                        {errorMessage}
                                    </Typography>
                                </Box>
                            )}
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained">
                            Create New User
                        </Button>
                    </Box>
                </form>
            )}

        </Formik>
    </Box>;
};

export default Form;
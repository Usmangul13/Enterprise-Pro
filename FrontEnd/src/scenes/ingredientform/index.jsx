import { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';

const initialValues = {
    skuid: "",
    ingredientname: "",
    quantity: "",
    size: "",
    unit: "",
    expirydate: "",
};

const userSchema = yup.object().shape({
    skuid: yup.string().required("required"),
    ingredientname: yup.string().required("required"),
    quantity: yup.string().required("required"),
    size: yup.string().required("required"),
    unit: yup.string().required("required"),
    expirydate: yup.string().required("required"),
});

const IngredientForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleFormSubmit = async (values) => {
        setSubmitting(true);
        try {
            // Send a POST request to the backend endpoint
            const response = await axios.post('http://localhost:3007/createIngredient', values);
            console.log(response.data);
            setSuccessMessage("INGREDIENT CREATED SUCCESSFULLY");
            setErrorMessage("");
        } catch (error) {
            console.error('Error creating ingredient:', error);
            setSuccessMessage("");
            setErrorMessage("FAILED TO CREATE INGREDIENT");
        } finally {
            setSubmitting(false);
        }
    };

    return <Box m="20px">
        <Header title="ADD INGREDIENT" subtitle="Add a new ingredient to the database" />

        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="SKU ID"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.skuid}
                            name="skuid"
                            error={!!touched.skuid && !!errors.skuid}
                            helperText={touched.skuid && errors.skuid}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Ingredient Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.ingredientname}
                            name="ingredientname"
                            error={!!touched.ingredientname && !!errors.ingredientname}
                            helperText={touched.ingredientname && errors.ingredientname}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Quantity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.quantity}
                            name="quantity"
                            error={!!touched.quantity && !!errors.quantity}
                            helperText={touched.quantity && errors.quantity}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Size"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.size}
                            name="size"
                            error={!!touched.size && !!errors.size}
                            helperText={touched.size && errors.size}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Unit"
                            placeholder="g,kg,ml,l"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.unit}
                            name="unit"
                            error={!!touched.unit && !!errors.unit}
                            helperText={touched.unit && errors.unit}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Expiry Date"
                            placeholder="yyyy-mm-dd"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.expirydate}
                            name="expirydate"
                            error={!!touched.expirydate && !!errors.expirydate}
                            helperText={touched.expirydate && errors.expirydate}
                            sx={{ gridColumn: "span 2" }}
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
                            Create New Ingredient
                        </Button>
                    </Box>
                </form>
            )}

        </Formik>
    </Box>;
};

export default IngredientForm;

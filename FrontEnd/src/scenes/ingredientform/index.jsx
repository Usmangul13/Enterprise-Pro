import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const initialValues = {
    ingredientid: "",
    ingredientname: "",
    quantity: "",
    size: "",
    unit: "",
    expirydate: "",
};

const userSchema = yup.object().shape({
    ingredientid: yup.string().required("required"),
    ingredientname: yup.string().required("required"),
    quantity: yup.string().required("required"),
    size: yup.string().required("required"),
    unit: yup.string().required("required"),
    expirydate: yup.string().required("required"),
})

const IngredientForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    }

    return <Box m="20px">
        <Header title="ADD INGREDIENT" subtitle="Add a new ingredient to the database" />

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
                            label="Ingredient ID"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.ingredientid}
                            name="ingredientid"
                            error={!!touched.ingredientid && !!errors.ingredientid}
                            helperText={touched.ingredientid && errors.ingredientid}
                            sx={{ gridColumn: "span 2"}}
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
                            sx={{ gridColumn: "span 2"}}
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
                            sx={{ gridColumn: "span 2"}}
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
                            sx={{ gridColumn: "span 2"}}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Unit"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.unit}
                            name="unit"
                            error={!!touched.unit && !!errors.unit}
                            helperText={touched.unit && errors.unit}
                            sx={{ gridColumn: "span 2"}}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Expiry Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.expirydate}
                            name="expirydate"
                            error={!!touched.expirydate && !!errors.expirydate}
                            helperText={touched.expirydate && errors.expirydate}
                            sx={{ gridColumn: "span 2"}}
                        />
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained">
                            Create New Product
                        </Button>
                    </Box>
                </form>
            )}

        </Formik>
    </Box>;
};

export default IngredientForm;
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const initialValues = {
    productname: "",
    price: "",
    size: "",
    unit: "",
    quantityavailable: "",
    description: "",
    category: "",
    expirydate: "",
};


const userSchema = yup.object().shape({
    productname: yup.string().required("required"),
    price: yup.string().required("required"),
    size: yup.string().required("required"),
    unit: yup.string().required("required"),
    quantityavailable: yup.string().required("required"),
    description: yup.string().required("required"),
    category: yup.string().required("required"),
    expirydate: yup.string().required("required"),
})

const ProductForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    }

    return <Box m="20px">
        <Header title="ADD PRODUCT" subtitle="Add a new product to the database" />

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
                            label="Product Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.productname}
                            name="productname"
                            error={!!touched.productname && !!errors.productname}
                            helperText={touched.productname && errors.productname}
                            sx={{ gridColumn: "span 2"}}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Price"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.price}
                            name="price"
                            error={!!touched.price && !!errors.price}
                            helperText={touched.price && errors.price}
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
                            label="Quantity Available"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.quantityavailable}
                            name="quantityavailable"
                            error={!!touched.quantityavailable && !!errors.quantityavailable}
                            helperText={touched.quantityavailable && errors.quantityavailable}
                            sx={{ gridColumn: "span 2"}}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                            name="description"
                            error={!!touched.description && !!errors.description}
                            helperText={touched.description && errors.description}
                            sx={{ gridColumn: "span 2"}}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Category"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.category}
                            name="category"
                            error={!!touched.category && !!errors.category}
                            helperText={touched.category && errors.category}
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

export default ProductForm;
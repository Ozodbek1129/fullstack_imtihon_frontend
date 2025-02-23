import React from "react";
import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").positive(),
  quantity: yup.number().required("Quantity is required").integer().min(1),
  category_id: yup.string().required("Category is required"),
  image: yup.mixed().required("Image is required"),
  date: yup.date().required("Date is required"),
});

const EditProductModal = ({ open, handleClose, product, categories, onSave }) => {
  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      quantity: product?.quantity || "",
      category_id: product?.category_id || "",
      image: null,
      date: product?.date || "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
      handleClose();
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2>Edit Product</h2>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            margin="normal"
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            margin="normal"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            margin="normal"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
          <TextField
            select
            fullWidth
            label="Category"
            name="category_id"
            margin="normal"
            value={formik.values.category_id}
            onChange={formik.handleChange}
            error={formik.touched.category_id && Boolean(formik.errors.category_id)}
            helperText={formik.touched.category_id && formik.errors.category_id}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])}
          />
          {formik.touched.image && formik.errors.image && (
            <p style={{ color: "red" }}>{formik.errors.image}</p>
          )}
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProductModal;

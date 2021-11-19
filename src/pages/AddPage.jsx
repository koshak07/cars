import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { adminContext } from "../contexts/AdminContext";

const AddPage = () => {
  const schema = yup.object({
    image: yup.string().min(1).max(200).required("Обязательно"),
    brand: yup.string().min(1).max(200).required("Обязательно"),
    model: yup.string().min(1).max(200).required("Обязательно"),
    color: yup.string().min(1).max(200).required("Обязательно"),
    yearOfIssue: yup.number().min(1).required("Обязательно"),
    price: yup.number().min(1).required("Обязательно"),

    description: yup.string().min(1).max(500).required("Обязательно"),

  });
  //стягиваем addcar с юзерконтекста
  const { addCar } = useContext(adminContext);
  const navigate = useNavigate()
  const handleSubmit = (car) => {
    addCar(car);
    navigate('/admin')
  };

  return (
    <div className="add-page">
      <h1>add Page</h1>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          image: "",
          brand: "",
          model: "",
          color: "",
          yearOfIssue: 0,
          price: 0,
          description: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="image"
              variant="filled"
              type="text"
              name="image"
              value={values.image}
              error={!!errors.image && touched.image}
              helperText={touched.image ? errors.image : ""}
              onChange={handleChange}
            />
             <TextField
              label="brand"
              variant="filled"
              type="text"
              name="brand"
              value={values.brand}
              error={!!errors.brand && touched.brand}
              helperText={touched.brand ? errors.brand : ""}
              onChange={handleChange}
            />
             <TextField
              label="model"
              variant="filled"
              type="text"
              name="model"
              value={values.model}
              error={!!errors.model && touched.model}
              helperText={touched.model ? errors.model : ""}
              onChange={handleChange}
            />
             <TextField
              label="color"
              variant="filled"
              type="text"
              name="color"
              value={values.color}
              error={!!errors.color && touched.color}
              helperText={touched.color ? errors.color : ""}
              onChange={handleChange}
            />
             <TextField
              label="yearOfIssue"
              variant="filled"
              type="text"
              name="yearOfIssue"
              value={values.yearOfIssue}
              error={!!errors.yearOfIssue && touched.yearOfIssue}
              helperText={touched.yearOfIssue ? errors.yearOfIssue : ""}
              onChange={handleChange}
            />
             <TextField
              label="price"
              variant="filled"
              type="text"
              name="price"
              value={values.price}
              error={!!errors.price && touched.price}
              helperText={touched.price ? errors.price : ""}
              onChange={handleChange}
            />
             <TextField
              label="description"
              variant="filled"
              type="text"
              name="description"
              value={values.description}
              error={!!errors.description && touched.description}
              helperText={touched.description ? errors.description : ""}
              onChange={handleChange}
            />
            <Button
            variant="contained" color="primary" type="submit"
            >
                Add Car
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddPage;

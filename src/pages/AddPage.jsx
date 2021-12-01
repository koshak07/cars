import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { adminContext } from "../contexts/AdminContext";

const AddPage = () => {
  const schema = yup.object({
    image: yup.string().min(1).max(10000).required("Обязательно"),
    roomType: yup.string().min(1).max(200).required("Обязательно"),
    roomSize: yup.string().min(1).required("Обязательно"),
    roomPrice: yup.number().min(1).required("Обязательно"),
    description: yup.string().min(1).max(1000).required("Обязательно"),
  });
  //стягиваем addroom с юзерконтекста
  const { addRoom } = useContext(adminContext);
  const navigate = useNavigate()
  const handleSubmit = (room) => {
    addRoom(room);
    navigate('/admin')
  };

  return (
    <div className="add-page">
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          image: "",
          roomType: "",
          // guests: 0,
          roomSize: "",
          roomPrice: 0,
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
              label="roomType"
              variant="filled"
              type="text"
              name="roomType"
              value={values.roomType}
              error={!!errors.roomType && touched.roomType}
              helperText={touched.roomType ? errors.roomType : ""}
              onChange={handleChange}
            />
             <TextField
              label="roomSize"
              variant="filled"
              type="text"
              name="roomSize"
              value={values.roomSize}
              error={!!errors.roomSize && touched.roomSize}
              helperText={touched.roomSize ? errors.roomSize : ""}
              onChange={handleChange}
            />
             <TextField
              label="roomPrice"
              variant="filled"
              type="text"
              name="roomPrice"
              value={values.roomPrice}
              error={!!errors.roomPrice && touched.roomPrice}
              helperText={touched.roomPrice ? errors.roomPrice : ""}
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
                Add Room
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddPage;

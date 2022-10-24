import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validation = Yup.object({
  name: Yup.string().required("name is required"),
  email: Yup.string().email("must be email").required("email is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d+$/, "Enter a valid phone number"),
});

const AddUser = () => {
  const navgate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("http://localhost:3004/users", values)
        .then((res) => {
          navgate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="container">
      <div className="innercontainer">
        <fom>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              sx={{ marginY: 2, width: "100%" }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              sx={{ marginY: 2, width: "100%" }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{ marginY: 2, width: "100%" }}
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              onChange={formik.handleChange("phone")}
              onBlur={formik.handleBlur("phone")}
              value={formik.values.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={formik.handleSubmit}
            >
              ADD USER
            </Button>
          </div>
        </fom>
      </div>
    </div>
  );
};

export default AddUser;

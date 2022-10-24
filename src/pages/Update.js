import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const validation = Yup.object({
  name: Yup.string().required("name is required"),
  email: Yup.string().email("must be email").required("email is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d+$/, "Enter a valid phone number"),
});

const Update = () => {
  const navgate = useNavigate();
  let { id } = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3004/users?id=${id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "" || user.name,
      email: "" || user.email,
      phone: "" || user.phone,
    },
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
      axios
        .put(`http://localhost:3004/users/${id}/`, values)
        .then((res) => {
          console.log(res);
          navgate('/')
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
              variant="outlined"
              onChange={formik.handleChange("phone")}
              onBlur={formik.handleBlur("phone")}
              value={formik.values.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <Button
              variant="contained"
              color="warning"
              onClick={formik.handleSubmit}
            >
              Update USER
            </Button>
          </div>
        </fom>
      </div>
    </div>
  );
};

export default Update;

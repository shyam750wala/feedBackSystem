import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Header from '../../../components/Header';
import { loginCustomerUser } from "../../../services/customeruser";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

const Login = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (values) => {
    console.log("submitted");
    console.log("values", values);

    try {
      const { customerTokenId, customerUserName, password } = values;
      const responseData = await loginCustomerUser(customerTokenId, customerUserName, password);
      const customerUserId = responseData.customerUserId;
      console.log("cid",customerUserId);
      alert("Login Successfully");
      navigate('customeruser/questionnaires',{state: { customerUserId }});
     
      // Handle successful login (e.g., redirect, store token, etc.)
    } catch (error) {
      console.error('Error logging in:', error);

      if (error.response) {
        if (error.response.status === 404) {
          alert("API endpoint not found. Please check the URL.");
        } else if (error.response.status === 401) {
          alert("Invalid customerTokenId, username, or password.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      } else {
        alert("Network error. Please check your connection.");
      }
    }
  };

  const loginSchema = yup.object().shape({
    customerTokenId: yup.string().required("Customer Admin Token is required"),
    customerUserName: yup.string().required("Customer User Name is required"),
    password: yup.string().required("Password is required"),
  });

  const initialValues = {
    customerTokenId: "",
    customerUserName: "",
    password: "",
  };

  return (
    <Box m="20px">
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <Header title="LOGIN" subtitle="Login to Customer Users" />
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleFormSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                <Box display="grid" gap="30px" gridTemplateColumns="repeat(1, minmax(0, 1fr))">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Customer Admin Token"
                    name="customerTokenId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.customerTokenId && !!errors.customerTokenId}
                    helperText={touched.customerTokenId && errors.customerTokenId}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Customer User Name"
                    name="customerUserName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.customerUserName && !!errors.customerUserName}
                    helperText={touched.customerUserName && errors.customerUserName}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting}>
                    Login
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;

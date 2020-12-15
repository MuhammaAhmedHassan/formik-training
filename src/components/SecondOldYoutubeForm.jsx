import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Email is required"),
  channel: Yup.string().required("Channel is required"),
});

function YoutubeForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      channel: "",
    },
    onSubmit: (values) => {
      console.log("form values", values);
    },
    validationSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            {...formik.getFieldProps("channel")}
          />
          {formik.touched.channel && (
            <div className="error">{formik.errors.channel}</div>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default YoutubeForm;

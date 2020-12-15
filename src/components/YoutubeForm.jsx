import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Email is required"),
  social: Yup.object().shape({
    facebook: Yup.string()
      .url("Must be a valid url")
      .required("This field is required"),
    twitter: Yup.string()
      .url("Must be a valid url")
      .required("This field is required"),
  }),

  phoneNumbers: Yup.array().of(Yup.string().required("This field is required")),
  phNumbers: Yup.array().of(Yup.string().required("This field is required")),
});

function YoutubeForm() {
  const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumbers: ["", ""],
    phNumbers: [""],
  };
  const onSubmit = (values) => {
    console.log(values);
  };

  const validateComments = (value) => {
    let error;
    if (!value) error = "This field is required";
    return error;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      //   validateOnChange={false} // default => true
      //   validateOnBlur={false}
    >
      {(formik) => {
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field type="text" id="email" name="email" />
              <ErrorMessage name="email">
                {(errMsg) => <div className="error">{errMsg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field type="text" id="channel" name="channel" />
              <ErrorMessage name="channel" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea" // as => input, textarea, select, or a custom-react-component. It's default value is input
                id="comments"
                name="comments"
                placeholder="Comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              {/* <Field name="address"> */}
              <FastField name="address">
                {(props) => {
                  console.log("Fast field");
                  const { field, form, meta } = props;
                  return (
                    <div>
                      <input
                        type="text"
                        id="address"
                        {...field} /** {...field} === name, value, handleChange, and handleBlur */
                      />
                      {meta.touched && meta.error && (
                        <div className="error">{meta.error}</div>
                      )}
                    </div>
                  );
                }}
              </FastField>
              {/* </Field> */}
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook Profile</label>
              <Field name="social.facebook" type="text" id="facebook" />
              <ErrorMessage name="social.facebook" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="twitter">Twitter Profile</label>
              <Field name="social.twitter" type="text" id="twitter" />
              <ErrorMessage name="social.twitter" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="primaryPh">Primary phone number</label>
              <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
              <ErrorMessage name="phoneNumbers[0]" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary phone number</label>
              <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
              <ErrorMessage name="phoneNumbers[1]" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="">List of phone numbers</label>
              <FieldArray name="phNumbers">
                {(props) => {
                  const { push, remove, form } = props;
                  const {
                    values: { phNumbers },
                  } = form;

                  console.log("form.errors", form.errors);

                  console.log("fieldArrayProps", props);
                  return (
                    <div>
                      {phNumbers.map((ph, index) => (
                        <div key={index}>
                          <div className="dynamic-field">
                            <Field name={`phNumbers[${index}]`} type="text" />
                            {index > 0 && (
                              <button
                                type="button"
                                className="minus-button dynamic-button"
                                onClick={() => remove(index)}
                              >
                                {" "}
                                -{" "}
                              </button>
                            )}
                            <button
                              type="button"
                              className="add-button dynamic-button"
                              onClick={() => push(index)}
                            >
                              {" "}
                              +{" "}
                            </button>
                          </div>
                          <ErrorMessage
                            name={`phNumbers[${index}]`}
                            component={TextError}
                          />
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              Validate Comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              Validate Entire Form
            </button>

            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              Visit Comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                })
              }
            >
              Visit Entire Form
            </button>

            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;

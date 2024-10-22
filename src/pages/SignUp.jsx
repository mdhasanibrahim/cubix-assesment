import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignUp.css";

const validationSchemaStep1 = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  uname: Yup.string().required("Username is required"),
  pwd: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  cpwd: Yup.string()
    .oneOf([Yup.ref("pwd"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const validationSchemaStep2 = Yup.object({
  fname: Yup.string().required("First Name is required"),
  lname: Yup.string().required("Last Name is required"),
  phno: Yup.string().required("Contact Number is required"),
  phno_2: Yup.string().required("Alternate Contact Number is required"),
});

const validationSchemaStep3 = Yup.object({
  pic: Yup.mixed().required("Photo is required"),
  signature: Yup.mixed().required("Signature is required"),
});

const SignUp = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const steps = 4; // Total steps

  const nextStep = () => {
    if (currentStep < steps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const setProgressBar = (step) => {
    return (step / steps) * 100;
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
          <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
            <h2 id="heading">Sign Up Your User Account</h2>
            <p>Fill all form field to go to next step</p>
            <Formik
              initialValues={{
                email: "",
                uname: "",
                pwd: "",
                cpwd: "",
                fname: "",
                lname: "",
                phno: "",
                phno_2: "",
                pic: null,
                signature: null,
              }}
              validationSchema={
                currentStep === 1
                  ? validationSchemaStep1
                  : currentStep === 2
                  ? validationSchemaStep2
                  : currentStep === 3
                  ? validationSchemaStep3
                  : null
              }
              onSubmit={(values, { setSubmitting }) => {
                if (currentStep === steps) {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                } else {
                  nextStep();
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form id="msform">
                  {/* Progress Bar */}
                  <ul id="progressbar">
                    <li
                      className={currentStep >= 1 ? "active" : ""}
                      id="account"
                    >
                      <strong>Account</strong>
                    </li>
                    <li
                      className={currentStep >= 2 ? "active" : ""}
                      id="personal"
                    >
                      <strong>Personal</strong>
                    </li>
                    <li
                      className={currentStep >= 3 ? "active" : ""}
                      id="payment"
                    >
                      <strong>Image</strong>
                    </li>
                    <li
                      className={currentStep === 4 ? "active" : ""}
                      id="confirm"
                    >
                      <strong>Finish</strong>
                    </li>
                  </ul>
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: `${setProgressBar(currentStep)}%` }}
                    ></div>
                  </div>
                  <br />
                  {/* Step 1: Account Information */}
                  {currentStep === 1 && (
                    <fieldset>
                      <div className="form-card">
                        <div className="d-flex justify-content-between">
                          <h2 className="fs-title">Account Information: </h2>
                          <h2 className="fs-step">Step {currentStep} - 4</h2>
                        </div>

                        <div>
                          <label>Email: *</label>
                          <Field
                            type="email"
                            name="email"
                            placeholder="Email Id"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error"
                          />
                        </div>

                        <div>
                          <label>Username: *</label>
                          <Field
                            type="text"
                            name="uname"
                            placeholder="Username"
                          />
                          <ErrorMessage
                            name="uname"
                            component="div"
                            className="error"
                          />
                        </div>

                        <div>
                          <label>Password: *</label>
                          <Field
                            type="password"
                            name="pwd"
                            placeholder="Password"
                          />
                          <ErrorMessage
                            name="pwd"
                            component="div"
                            className="error"
                          />
                        </div>

                        <div>
                          <label>Confirm Password: *</label>
                          <Field
                            type="password"
                            name="cpwd"
                            placeholder="Confirm Password"
                          />
                          <ErrorMessage
                            name="cpwd"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button type="submit" className="next action-button">
                          Next
                        </button>
                      </div>
                    </fieldset>
                  )}

                  {/* Step 2: Personal Information */}
                  {currentStep === 2 && (
                    <fieldset>
                      <div className="form-card">
                        <div className="d-flex justify-content-between">
                          <h2 className="fs-title">Personal Information: </h2>
                          <h2 className="fs-step">Step {currentStep} - 4</h2>
                        </div>
                        <div>
                          <label>First Name: *</label>
                          <Field
                            type="text"
                            name="fname"
                            placeholder="First Name"
                          />
                          <ErrorMessage
                            name="fname"
                            component="div"
                            className="error"
                          />
                        </div>

                        <div>
                          <label>Last Name: *</label>
                          <Field
                            type="text"
                            name="lname"
                            placeholder="Last Name"
                          />
                          <ErrorMessage
                            name="lname"
                            component="div"
                            className="error"
                          />
                        </div>

                        <div>
                          <label>Contact No.: *</label>
                          <Field
                            type="text"
                            name="phno"
                            placeholder="Contact No."
                          />
                          <ErrorMessage
                            name="phno"
                            component="div"
                            className="error"
                          />
                        </div>

                        <div>
                          <label>Alternate Contact No.: *</label>
                          <Field
                            type="text"
                            name="phno_2"
                            placeholder="Alternate Contact No."
                          />
                          <ErrorMessage
                            name="phno_2"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="previous action-button-previous"
                          onClick={prevStep}
                        >
                          Previous
                        </button>
                        <button type="submit" className="next action-button">
                          Next
                        </button>
                      </div>
                    </fieldset>
                  )}

                  {/* Step 3: Image Upload */}
                  {currentStep === 3 && (
                    <fieldset>
                      <div className="form-card">
                        <div className="d-flex justify-content-between">
                          <h2 className="fs-title">Image Upload: </h2>
                          <h2 className="fs-step">Step {currentStep} - 4</h2>
                        </div>
                        <div>
                          <label>Upload Your Photo: *</label>
                          <input
                            type="file"
                            name="pic"
                            onChange={(event) => {
                              const file = event.target.files[0];
                              setFieldValue("pic", file);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setImagePreview(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                          <ErrorMessage
                            name="pic"
                            component="div"
                            className="error"
                          />
                          {imagePreview && (
                            <div>
                              <h5>Preview:</h5>
                              <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: "100%", height: "auto" }}
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <label>Upload Signature Photo: *</label>
                          <input
                            type="file"
                            name="signature"
                            onChange={(event) => {
                              const file = event.target.files[0];
                              setFieldValue("signature", file);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setSignaturePreview(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                          <ErrorMessage
                            name="signature"
                            component="div"
                            className="error"
                          />
                          {signaturePreview && (
                            <div>
                              <h5>Preview:</h5>
                              <img
                                src={signaturePreview}
                                alt="Signature Preview"
                                style={{ maxWidth: "100%", height: "auto" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="previous action-button-previous"
                          onClick={prevStep}
                        >
                          Previous
                        </button>
                        <button type="submit" className="next action-button">
                          Next
                        </button>
                      </div>
                    </fieldset>
                  )}

                  {/* Step 4: Success */}
                  {currentStep === 4 && (
                    <fieldset>
                      <div className="form-card">
                        <div className="d-flex justify-content-between">
                          <h2 className="fs-title">Finish: </h2>
                          <h2 className="fs-step">Step {currentStep} - 4</h2>
                        </div>
                        <h2 className="purple-text text-center">
                          <strong>SUCCESS!</strong>
                        </h2>
                        <h5 className="purple-text text-center mt-3">
                          You Have Successfully Signed Up
                        </h5>
                      </div>
                    </fieldset>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

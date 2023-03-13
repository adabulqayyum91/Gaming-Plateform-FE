import { Formik } from "formik";
import React from "react";

import MaskGp1 from "../../../../../assets/Mask Group 1.svg";
import "./index.css";

export default function ForgotPass({ forgotPassHandler, setshowForgotForm }) {
  return (
    <div className="resetPwd-main resetPwd-center  ">
      <div className="resetPwd-frm">
        <div className="resetPwd-frt-head">
          <h4>Forgot Password?</h4>
          <p>
            Please fill in the email that you used to register. You will be sent
            an email with instructions on how to reset your password.
          </p>
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => forgotPassHandler(values)}
        >
          {({ handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="resetPwd-mb-3 ">
                  <span>
                    <img alt="" height="16px" src={MaskGp1} width="16px" />
                  </span>
                  <input
                    className="resetPwd-inputField resetPwd-form-control-sm"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    type="email"
                    autoComplete="off"
                  />
                </div>
                <button className="resetPwd-sbtn resetPwd-mt-4 " type="submit">
                  Send email
                </button>
                <div className="resetPwd-crt resetPwd-mt-2 resetPwd-form-control-sm">
                  <span> Go to Sign in panel ! </span>&nbsp; &nbsp;
                  <a
                    className="resetPwd-crt-bt"
                    onClick={() => setshowForgotForm(false)}
                  >
                    Sign in
                  </a>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

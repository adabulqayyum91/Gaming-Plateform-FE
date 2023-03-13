import { Formik } from "formik";
import React from "react";
import MaskGp1 from "../../../../../assets/Mask Group 1.svg";
import "./index.css";
export default function ResetPass({ resetPassHanlder, setshowForgotForm }) {
  return (
    <div className="forgotPwd-main forgotPwd-center  ">
      <div className="forgotPwd-frm">
        <div className="forgotPwd-frt-head">
          <h4>Reset Password</h4>
        </div>
        <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => resetPassHanlder(values)}
        >
          {({ handleChange, handleSubmit }) => {
            return (
              <form className="forgot-form" onSubmit={handleSubmit}>
                <div className="forgotPwd-mb-3 ">
                  <span>
                    <img alt="" height="16px" src={MaskGp1} width="16px" />
                  </span>
                  <input
                    className="forgotPwd-inputField forgotPwd-form-control-sm"
                    placeholder="New Password"
                    type="password"
                    name="newPassword"
                    onChange={handleChange}
                  />
                </div>
                <div className="forgotPwd-mb-3 ">
                  <span>
                    <img alt="" height="16px" src={MaskGp1} width="16px" />
                  </span>
                  <input
                    className="forgotPwd-inputField forgotPwd-form-control-sm"
                    placeholder="Confirm password"
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="forgotPwd-sbtn forgotPwd-mt-4 "
                  type="submit"
                >
                  Update
                </button>
              </form>
            );
          }}
        </Formik>

        <div className="forgotPwd-crt forgotPwd-mt-2 forgotPwd-form-control-sm">
          <span> If you just updated? </span>&nbsp;
          <span
            className="forgotPwd-crt-bt "
            onClick={() => setshowForgotForm(false)}
          >
            Please Login
          </span>
        </div>
      </div>
    </div>
  );
}

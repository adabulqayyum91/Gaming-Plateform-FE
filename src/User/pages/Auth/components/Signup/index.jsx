import { Formik } from "formik";
import React from "react";

import MaskGp1 from "../../../../../assets/Mask Group 1.svg";
import MaskGp2 from "../../../../../assets/Mask Group 2.svg";
import MaskGp4 from "../../../../../assets/Mask Group 4.svg";

export default function Index({ signupHandler, setsignUpShow }) {
  return (
    <div className="authlogin-tab-content">
      <Formik
        initialValues={{
          userName: "",
          fullName: "",
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          signupHandler(values);
          setsignUpShow(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <form
              className="authlogin-frm "
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <input autoComplete="false" type="hidden" />
              <div className="mb-3 ">
                <span>
                  {" "}
                  <img alt="" height="16px" src={MaskGp4} width="16px" />
                </span>
                <input
                  className="authlogin-inputField  authlogin-form-control-sm"
                  name="fullName"
                  placeholder="Full Name"
                  type="text"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 ">
                <span>
                  <img alt="" height="16px" src={MaskGp4} width="16px" />
                </span>
                <input
                  className="authlogin-inputField  authlogin-form-control-sm"
                  name="userName"
                  placeholder="Username"
                  type="text"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <div className="authlogin-invalid-feedback">
                  {/* <div >{{errors.userName}}</div> */}
                </div>
              </div>
              <div className="mb-3 ">
                <span>
                  <img alt="" height="16px" src={MaskGp1} width="16px" />
                </span>
                <input
                  className="authlogin-inputField authlogin-form-control-sm"
                  required
                  placeholder="Email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <span>
                  <img alt="" height="16px" src={MaskGp2} width="16px" />
                </span>
                <input
                  className="authlogin-inputField authlogin-form-control-sm"
                  placeholder="********"
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
                <img className="authlogin-hide-show" />
              </div>
              <button className="authlogin-sbtn authlogin-mt-4 " type="submit">
                Sign up
              </button>
            </form>
          );
        }}
      </Formik>
      <div className="authlogin-crt authlogin-mt-2">
        <span> Already have an account? </span>&nbsp;
        <a className="authlogin-crt-bt" onClick={() => setsignUpShow(false)}>
          Sign in instead
        </a>
      </div>
    </div>
  );
}

import React from "react";
import MaskGp1 from "../../../../../assets/Mask Group 1.svg";
import MaskGp2 from "../../../../../assets/Mask Group 2.svg";
import { Formik } from "formik";
// import "./index.css";

export default function Index({
  setshowForgotForm,
  loginHandler,
  setsignUpShow,
}) {
  return (
    <div className="authlogin-tab-content" id="myTabContent">
      <div aria-labelledby="home-tab" id="home" role="tabpanel">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => loginHandler(values)}
        >
          {({ handleChange, handleSubmit }) => {
            return (
              <form
                className="authlogin-frm"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <input autoComplete="false" type="hidden" />
                <div className="mb-3 ">
                  <span>
                    <img alt="icon" height="16px" src={MaskGp1} width="16px" />
                  </span>
                  <input
                    className="authlogin-inputField authlogin-form-control-sm"
                    placeholder="Email"
                    name="email"
                    type="email"
                    required
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <span>
                    <img alt="icon" height="16px" src={MaskGp2} width="16px" />
                  </span>
                  <input
                    className="authlogin-inputField  authlogin-form-control-sm"
                    id="exampleInputPassword1"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                  />

                  <div className="authlogin-invalid-feedback"></div>
                </div>
                <a className="authlogin-frt " type="submit">
                  <span
                    className="authlogin-bt-fr"
                    onClick={() => setshowForgotForm(true)}
                  >
                    Forgot Password?
                  </span>
                </a>
                <button className="authlogin-sbtn authlogin-mt-4" type="submit">
                  Sign in
                </button>
              </form>
            );
          }}
        </Formik>

        <div className="authlogin-crt authlogin-mt-2">
          <span> New on our platform? </span>&nbsp;
          <span
            className="authlogin-crt-bt "
            onClick={() => setsignUpShow(true)}
          >
            Create an account
          </span>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import SignIn from "../Signin/index";
import SignUp from "../Signup/index";
import "./index.css";

export default function Index({
  setshowForgotForm,
  loginHandler,
  signupHandler,
  signUp,
}) {
  const [signUpShow, setsignUpShow] = useState(false);

  useEffect(() => {
    if (signUp) {
      setsignUpShow(false);
    }
  }, []);

  return (
    <>
      <div className="authlogin-button-manger">
        <ul className="nav authlogin-nav-pills " id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${!signUpShow ? "activeTab" : ""}`}
              onClick={() => setsignUpShow(false)}
            >
              Sign in
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${signUpShow ? "activeTab" : ""}`}
              onClick={() => setsignUpShow(true)}
            >
              Sign up
            </button>
          </li>
        </ul>
        {signUpShow ? (
          <SignUp signupHandler={signupHandler} setsignUpShow={setsignUpShow} />
        ) : (
          <SignIn
            loginHandler={loginHandler}
            setshowForgotForm={setshowForgotForm}
            setsignUpShow={setsignUpShow}
          />
        )}
      </div>
    </>
  );
}

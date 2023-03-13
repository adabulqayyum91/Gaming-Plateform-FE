import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import Login from "./components/Login/index";
import ForgotPassword from "./components/ForgotPass";
import ResetPassWord from "./components/ResetPass";
import { login, signup, resetPass, forgotPass } from "./reducers";
import { setNavText } from "../../layout/header/reducers";

export default function Index() {
  const { id } = useParams();
  const [showForgotForm, setshowForgotForm] = useState(false);
  const [cloneId, setCloneId] = useState(id);
  const userAuth = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signUp, reset } = userAuth;

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/admin/dashboard");
    }
    if (localStorage.getItem("userToken")) {
      navigate("/user/profile");
    }
  }, []);

  const loginHandler = (val) => {
    dispatch(login(val));
  };
  const signupHandler = (val) => {
    dispatch(signup(val));
  };
  const resetPassHanlder = (val) => {
    dispatch(resetPass({ ...val, userId: id }));
    setshowForgotForm(false);
    setCloneId("");
  };
  const forgotPassHandler = (val) => {
    console.log(val);
    dispatch(forgotPass(val));
  };
  const showForgotFormHandler = () => {
    setshowForgotForm(false);
    setCloneId("");
  };

  return (
    <div
      className="container-fluid"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <div className="contrainer row top-row">
        <div className="col-md-8 padding-5">
          <div className="topContainer">
            <h2 className="firstHeading">
              Gaming <br />
              Plateform
            </h2>
            <p className="secondHeading">
              Best user experience of <br /> online gaming
            </p>
          </div>
          <div className="bottomcintainer">
            <h1 className="firstbottom">Play & Compete</h1>
            <p className="secondbottom">
              Create an account today to compete against different opponents
            </p>
          </div>
        </div>

        <div className="col-md-4 center blurBackground ">
          {cloneId ? (
            <ResetPassWord
              resetPassHanlder={resetPassHanlder}
              setshowForgotForm={showForgotFormHandler}
            />
          ) : (
            <>
              {!showForgotForm ? (
                <Login
                  loginHandler={loginHandler}
                  setshowForgotForm={setshowForgotForm}
                  signupHandler={signupHandler}
                  signUp={signUp}
                />
              ) : (
                <ForgotPassword
                  forgotPassHandler={forgotPassHandler}
                  setshowForgotForm={setshowForgotForm}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

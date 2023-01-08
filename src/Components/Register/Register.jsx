import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Register.module.scss";

export default function Register() {
  const [user, SetUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    password: "",
  });
  const [userValidation, SetUserValidation] = useState({
    first_name: {
      error: false,
      errorMessage: "must be string & at least 4 characters",
    },
    last_name: {
      error: false,
      errorMessage: "must be string & at least 4 characters",
    },
    email: {
      error: false,
      errorMessage: "must provide valid mail",
    },
    age: {
      error: false,
      errorMessage: "age min is 20",
    },
    password: {
      error: false,
      errorMessage: "password must contain symbols, letters & numbers ",
    },
  });
  let [errorMsg, setErrormsg] = useState("");
  //Navigate
  let navigate = useNavigate();
  let goToLogin = () => {
    navigate("/login");
  };

  //onchange
  let inputInfo = (e) => {
    let MyUser = { ...user };
    MyUser[e.target.name] = e.target.value;
    SetUser(MyUser);
  };
  // joi validation
  let validationForm = () => {
    let schema = Joi.object({
      first_name: Joi.string().required().alphanum().min(4).max(10),
      last_name: Joi.string().required().alphanum().min(4).max(10),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      age: Joi.number().required().min(20).max(70),
      password: Joi.string()
        .required()
        .pattern(
          new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)
        ),
    });
    return schema.validate(user, { abortEarly: false });
  };
  //onsubmit
  let formData = async (e) => {
    e.preventDefault();
    SetUserValidation({
      first_name: {
        error: false,
        errorMessage: "must be string & at least 4 characters",
      },
      last_name: {
        error: false,
        errorMessage: "must be string & at least 4 characters",
      },
      email: {
        error: false,
        errorMessage: "must provide valid mail",
      },
      age: {
        error: false,
        errorMessage: "age min is 20",
      },
      password: {
        error: false,
        errorMessage: "password must contain symbols, letters & numbers ",
      },
    });
    let validateResponse = validationForm();
    if (validateResponse.error) {
      validateResponse.error.details.forEach((error) => {
        SetUserValidation((userValidation) => {
          return {
            ...userValidation,
            [error.path[0]]: { ...userValidation[error.path[0]], error: true },
          };
        });
      });
    } else {
      let { data } = await axios.post(
        "https://sticky-note-fe.vercel.app/signup",
        user
      );
      if (data.message === "success") {
        goToLogin();
      } else {
        setErrormsg(data.errors.email.message);
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className={`${style.reg}  `}>
          <div className="row">
            <div className={`${style.item} col-lg-6`}></div>
            <div className={`${style.itm} col-lg-6 text-center`}>
              <div className={`${style.info} py-3 mb-2`}>
                <h4 className="text-muted m-3 ">Create My Account!</h4>

                <form onSubmit={formData}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className={`${style.inputData}  `}>
                        <input
                          onChange={inputInfo}
                          type="text"
                          name="first_name"
                          className="form-control "
                          placeholder="First Name"
                        />
                        {userValidation.first_name.error ? (
                          <div
                            className={`${style.errorMsg} alert p-1 text-start`}
                          >
                            {userValidation.first_name.errorMessage}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className={`${style.inputData}  `}>
                        <input
                          onChange={inputInfo}
                          type="text"
                          name="last_name"
                          className="form-control "
                          placeholder="Last Name"
                        />
                        {userValidation.last_name.error ? (
                          <div
                            className={`${style.errorMsg} alert p-1 text-start`}
                          >
                            {userValidation.last_name.errorMessage}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={`${style.inputData} my-3 `}>
                    <input
                      onChange={inputInfo}
                      type="email"
                      name="email"
                      className="form-control my-2"
                      placeholder="Email"
                    />
                    {userValidation.email.error ? (
                      <div className={`${style.errorMsg} alert p-1 text-start`}>
                        {userValidation.email.errorMessage}
                      </div>
                    ) : (
                      ""
                    )}
                    {errorMsg ? (
                      <div className={`${style.errorMsg} alert p-1 text-start`}>
                        {errorMsg}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={`${style.inputData} my-3 `}>
                    <input
                      onChange={inputInfo}
                      type="number"
                      name="age"
                      className="form-control my-2"
                      placeholder="Age"
                    />
                    {userValidation.age.error ? (
                      <div className={`${style.errorMsg} alert p-1 text-start`}>
                        {userValidation.age.errorMessage}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className={`${style.inputData} my-3 `}>
                    <input
                      onChange={inputInfo}
                      type="password"
                      name="password"
                      className="form-control my-2"
                      placeholder="Password"
                    />
                    {userValidation.password.error ? (
                      <div className={`${style.errorMsg} alert p-1 text-start`}>
                        {userValidation.password.errorMessage}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={`${style.inputData} my-3 `}>
                    <button className={`${style.myBtn} btn btn-primary w-100`}>
                      Create Account
                    </button>
                  </div>
                </form>
                <div className={`${style.spany} py-2 text-muted`}>
                  This site is protected by reCAPTCHA and the Google
                  <a href="https://www.google.com/" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#6c757d" }}>
                    Privacy Policy
                  </a>
                  and
                  <a href="https://www.google.com/" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#6c757d" }}>
                    Terms of Service
                  </a>
                  apply.
                </div>
                <div className={`${style.brdr} mb-3`}></div>
                <span className={`${style.spany} text-muted`}>
                  Already a member?{" "}
                  <Link
                    style={{ textDecoration: "none", color: "#4799eb" }}
                    to="/login">
                    Log in
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

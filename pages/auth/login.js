import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import userData from "../data.json";
import { useRouter } from "next/router";
import axios from "axios";
const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email Id is required!").email(),
    password: Yup.string().required("Must be at least 8 characters.").min(8),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState();
  const [error, setError] = useState();
  // console.log("🚀 ~ file: login.js ~ line 20 ~ Login ~ loginData", loginData)
  const router = useRouter();
  useEffect(() => {
    userData.map((item) => {
      if (item.email === loginData?.email) {
        localStorage.setItem("userData", JSON.stringify(item));
        router.push("/chats");
      }
    });
  }, [loginData]);
  const handleSubmit = async (value) => {
    try {
      const result = await axios
        .post(`/api/auth`, {
          email: value.email,
          password: value.password,
          apitype: "Login",
        })
        .then((data) => {
          localStorage.setItem("userData", JSON.stringify(data.data));
          router.push("/chats");
        })
        .catch((err) => {
          console.log(
            "🚀 ~ file: login.js ~ line 44 ~ handleSubmit ~ err",
            err
          );
          setError(err?.response?.data?.msg);
        });
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className=" min-h-screen grid bg-white lg:grid-cols-2 lg:col-rows-1">
      <div className="relative hidden     lg:flex items-center after:top-0 after:bottom-0 after:opacity-60 after:left-0 after:right-0  after:absolute after:content-[' ']  after:bg-violet600">
        <div className="p-[60px] pt-[190px]  relative z-[8] ">
          <h1 className="text-[32px] leading-[50px]  mb-10 font-semibold text-white">
            Turn Your Impressions And Engagements Into Earnings
          </h1>
          <p className="text-[#E2D7F9] text-[15px] font-medium leanding-[22px]">
            Create a free account and get full access hundreds of influecer
            jobs. Trusted by 5000+ Influencers.
          </p>
        </div>
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/assets/images/Branding&Lifestyle.png"
          alt="Branding&Lifestyle"
        />
        <img
          src="/assets/images/Logo.svg"
          alt="logo"
          className="absolute z-[1] top-[55px] left-[60px]"
        />
      </div>
      <div className="flex  flex-col justify-center items-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-[134px]">
        <div className="mx-auto w-full ">
          <div>
            <h2 className="mt-6 text-xl font-semibold tracking-tight text-dark900">
              Welcome Back!
            </h2>
            <p className="mt-2 text-[15px] font-medium text-gray800">
              We’re happy to see you again. To use your account, login first
            </p>
          </div>
          <div className="mt-14">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={(values) => {
                setLoginData(values);
                handleSubmit(values);
              }}
            >
              {(formik) => {
                return (
                  <Form>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[13px] font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                          onClick={() => setError()}
                        />
                        <div style={{ color: "red" }}>
                          <ErrorMessage
                            type="email"
                            name="email"
                            component="span"
                            className="error text-[13px] font-medium leanding-[20px] text-red500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <label
                        htmlFor="password"
                        className="block text-[13px] font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1 relative">
                        <Field
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded border border-slate-300 px-3 pr-10 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                          onClick={() => setError()}
                        />
                        <div style={{ color: "red" }}>
                          <ErrorMessage
                            type="password"
                            name="password"
                            component="span"
                            className="error text-[13px] font-medium leanding-[20px] text-red500"
                          />
                        </div>

                        <button
                          className="absolute right-0  top-0 h-[48px]  px-3 py-2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <img className="" src="/assets/icons/view-off.svg" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center mt-[18px] justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 bg-white w-4  rounded-[2.8px] accent-violet600 border-gray-300 text-violet600 focus:ring-0"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block font-medium text-sm text-gray800"
                        >
                          Remember me
                        </label>
                      </div>
                      <div>
                        <Link
                          href="/influencer/forgotpassword"
                          className="font-medium text-violet600 hover:text-indigo-500"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>

                    <div style={{ color: "red" }}>
                      {Boolean(error) && error}
                    </div>

                    <div className="mt-12">
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded border border-transparent bg-violet600 py-3 px-4 text-[15px] font-semibold text-white shadow-sm  focus:outline-none focus:ring-0 "
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="flex justify-center items-center mt-[34px]">
            <div className="mr-7 ">
              <button className="">
                <img src="/assets/icons/google.svg" />
              </button>
            </div>
            <div>
              <button>
                <img src="/assets/icons/facebook.svg" />
              </button>
            </div>
          </div>
          <div className="mt-8 text-center">
            <span className="text-[15px] font-medium text-gray800">
              Don’t have an account?
              <Link
                href="/auth/signup"
                className="text-[15px] font-medium text-violet600"
              >
                {" "}
                Create Account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

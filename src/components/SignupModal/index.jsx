import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSendOtpMutation, useSignupMutation } from "../../services/api";
import InputField from "../Input";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import "./style.scss";
import { openNotification } from "../../utils/helpers";
const SignupModal = ({ setTitleSide, closeSelf, openLogin }) => {
  const methods = useForm();
  const methods2 = useForm();
  const [signup, { isLoading }] = useSignupMutation();
  const [sendotp, { isLoading: otploading }] = useSendOtpMutation();
  const [otpSide, setOtpSide] = useState(false);
  const emailprovided = methods.watch("email");

  const onSubmit = async (val) => {
    try {
      // call login trigger from rtk query
      const response = await signup(val).unwrap();
      // set user details and token in the state
      console.log(response);
      openNotification({
        type: "success",
        title: "Sign Up",
        message: `Sign up successful`,
      });
      methods.reset();
      setOtpSide(true);
    } catch (err) {
      console.log(err);
      if (err.status === "FETCH_ERROR") {
        openNotification({
          type: "error",
          title: "Error",
          message: "an error occured",
        });
      } else {
        openNotification({
          type: "error",
          title: "Error",
          message: err.data.message,
        });
      }
    }
  };
  const onSubmitOtp = async (val) => {
    console.log(val);
    try {
      // call login trigger from rtk query
      const response = await sendotp(val).unwrap();
      // set user details and token in the state
      console.log(response);
      openNotification({
        type: "success",
        title: "Otp",
        message: `Successful`,
      });
      methods.reset();
      setOtpSide(true);
    } catch (err) {
      console.log(err);
      if (err.status === "FETCH_ERROR") {
        openNotification({
          type: "error",
          title: "Error",
          message: "an error occured",
        });
      } else {
        openNotification({
          type: "error",
          title: "Error",
          message: err.data.message,
        });
      }
    }
  };
  return (
    <div className="pd_login_modal sign">
      {!otpSide ? (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="cover_all">
              <label>Name</label>
              <div className="form-group-wrap">
                <InputField
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  id="first_name"
                  label=""
                  errMsg="invalid  input"
                />
                <InputField
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  id="last_name"
                  label=""
                  errMsg="invalid  input"
                />
              </div>
            </div>

            <div className="form-group-wrap">
              <InputField
                type="email"
                name="email"
                placeholder="rajimus@gmail.com"
                id="email"
                label="Email"
                errMsg="invalid  input"
              />
              <InputField
                type="number"
                name="phone"
                placeholder="09091929199"
                id="Phone Number"
                label="phone Number"
                errMsg="invalid  input"
              />
            </div>

            <InputField
              type="password"
              name="password"
              id="password"
              label="Password"
              errMsg="invalid input"
            />
            <p className="last_text first">
              By signing up, you accept our{" "}
              <Link to="/">Terms and Conditions?</Link>
            </p>
            <SubmitBtn
              disabled={false}
              isLoading={isLoading}
              btnText={"Sign Up"}
            />
            <p className="last_text">
              Already have an account?{" "}
              <span
                onClick={() => {
                  closeSelf(false);
                  openLogin(true);
                }}
              >
                Login
              </span>
            </p>
          </form>
        </FormProvider>
      ) : (
        <div className="phone_verification">
          <div className="title_box">
            <p>Email Verification</p>
            <div className="line"></div>
          </div>
          <p className="desc">
            An OTP code was sent to your email . Please input the code below.
          </p>
          <FormProvider {...methods2}>
            <form onSubmit={methods2.handleSubmit(onSubmitOtp)}>
              <InputField
                type="number"
                name="otp"
                placeholder="Enter OTP"
                id="otp"
                label=""
                errMsg="invalid input"
              />
              {/* <p className="last_text">
                Don’t get verification code?{" "}
                <span className="likea" to="/">
                  Resend Code?
                </span>
              </p> */}
              <SubmitBtn
                disabled={false}
                isLoading={otploading}
                btnText={"Continue"}
              />
              <p className="last_text">
                <span
                  onClick={() => {
                    closeSelf(false);
                    openLogin(true);
                  }}
                  className="likea line"
                >
                  Skip this
                </span>
              </p>
            </form>
          </FormProvider>
        </div>
      )}
    </div>
  );
};

export default SignupModal;

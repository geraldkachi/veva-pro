import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import InputField from "../../components/Input";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { useLoginMutation, useRecoverMailMutation } from "../../services/api";
import { setUserDetails, setUserToken } from "../../store/slice/AuthSlice";
import { openNotification } from "../../utils/helpers";
import "./style.scss";
const ResetMailModal = ({
  setOpenModal,
  setRerend,
  openLogin,
  closeSelf,
  setisNavOpen,
}) => {
  const methods = useForm();
  const [recover, { isLoading }] = useRecoverMailMutation();
  const dispatch = useDispatch();

  const onSubmit = async (val) => {
    console.log(val);
    setisNavOpen && setisNavOpen(false);
    try {
      // call login trigger from rtk query
      const response = await recover(val).unwrap();
      // set user details and token in the state
      console.log(response);
      openNotification({
        type: "success",
        title: "Reset Password",
        message: `Mail sent successfully`,
      });
      methods.reset();
      if (setOpenModal) {
        setOpenModal(true);
      }
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
    <div className="pd_login_modal">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField
            type="email"
            name="email"
            placeholder="stephen@gmail.com"
            id="email"
            label="Email Address"
            errMsg="invalid email input"
          />

          <SubmitBtn
            disabled={false}
            isLoading={isLoading}
            btnText={"Submit"}
          />
          <p className="last_text">
            Remeber Passsword?{" "}
            <span
              onClick={() => {
                closeSelf(false);
                openLogin(true);
              }}
              className="likea"
            >
              Login
            </span>
          </p>
        </form>
      </FormProvider>
    </div>
  );
};

export default ResetMailModal;

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import InputField from "../../components/Input";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { useRecoverPasswordMutation } from "../../services/api";
import { openNotification } from "../../utils/helpers";
import "./style.scss";
const ResetPasswordModal = ({
  setOpenModal,
  token,
  closeSelf,
  setisNavOpen,
}) => {
  const methods = useForm();
  const [recover, { isLoading }] = useRecoverPasswordMutation();
  const dispatch = useDispatch();

  const onSubmit = async (val) => {
    console.log(val);
    setisNavOpen && setisNavOpen(false);
    const payload = {
      ...val,
      token,
    };
    try {
      // call login trigger from rtk query
      const response = await recover(payload).unwrap();
      // set user details and token in the state
      console.log(response);
      openNotification({
        type: "success",
        title: "Reset Password",
        message: `Password changed successfully`,
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
            type="password"
            name="password"
            id="password"
            label="Password"
            errMsg="invalid input"
          />

          <SubmitBtn
            disabled={false}
            isLoading={isLoading}
            btnText={"Submit"}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default ResetPasswordModal;

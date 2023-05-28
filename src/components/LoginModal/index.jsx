import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import InputField from "../../components/Input";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { useLoginMutation } from "../../services/api";
import { setUserDetails, setUserToken } from "../../store/slice/AuthSlice";
import { openNotification } from "../../utils/helpers";
import "./style.scss";
const LoginModal = ({
  setOpenModal,
  setRerend,
  setSignModal,
  closeSelf,
  setisNavOpen,
  openRecover,
}) => {
  const methods = useForm();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = async (val) => {
    console.log(val);
    setisNavOpen && setisNavOpen(false);
    try {
      // call login trigger from rtk query
      const response = await login(val).unwrap();
      // set user details and token in the state
      console.log(response);
      openNotification({
        type: "success",
        title: "Login",
        message: `Login successful`,
      });
      methods.reset();
      dispatch(setUserDetails({ user: response.user }));
      dispatch(setUserToken({ token: response.tokens.access.token }));

      if (setOpenModal) {
        setOpenModal(true);
      }
      if (setRerend) {
        setRerend(false);
      }
      closeSelf(false);
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
            btnText={"Sign in"}
          />
          <div className="flex_last">
            <p className="last_text">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  closeSelf(false);
                  setSignModal(true);
                }}
                className="likea"
                to="/"
              >
                Sign up
              </span>
            </p>
            <p
              onClick={() => {
                openRecover(true);
              }}
              className="recover"
            >
              Reset password
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginModal;

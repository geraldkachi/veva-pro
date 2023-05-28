import "./style.scss";
import pay from "../../assets/icons/pay.svg";
import vcoins from "../../assets/icons/vcoins.svg";
import cash from "../../assets/icons/cash.svg";
import ShowCartSide from "../ShowCartSide";
import { useEffect, useId, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../Input";
import Textbox from "../Input/Textbox";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import {
  useGetUserCartOnlineQuery,
  useInitPaymentMutation,
  useMakeOrderMutation,
  useMakeOrderQrMutation,
} from "../../services/api";
import { openNotification } from "../../utils/helpers";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useGetUser } from "../../hooks/getUserHook";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Checkbox from "@mui/material/Checkbox";

const Checkoutmodal = ({ store, schedule }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const methods = useForm();
  const location = useLocation();
  const cart = useSelector((state) => state.cart);
  const { user } = useGetUser();
  const searchParams = queryString.parse(location.search);
  const payType = [
    {
      name: "card",
      desc: "Pay with card",
      image: pay,
    },
    {
      name: "cash",
      desc: "Cash on delivery",
      image: cash,
    },
    {
      name: "vcoins",
      desc: "Pay using vcoins",
      image: vcoins,
    },
  ];

  const [paytype, setPayType] = useState("");
  const [makeOrder, { isLoading }] = useMakeOrderMutation();
  const [initPayment, { isLoading: loadInit }] = useInitPaymentMutation();
  const [makeOrderQr, { isLoading: isLoadingQr }] = useMakeOrderQrMutation();
  const [load, setLoad] = useState(false);
  const id = useId();
  const handletype = (type) => {
    setPayType(type);
  };
  const {
    data = null,
    isLoading: loadcart,
    isError,
    error,
  } = useGetUserCartOnlineQuery();
  const handleCheckout = async (val) => {
    setLoad(true);
    const delivery = checked ? 1000 : 0;
    const convenience =
      data.data.totalCartAmt + delivery + data.data.totalCartAmt * 0.05;
    console.log(convenience);
    const payloadinit = {
      amount: data.data.totalCartAmt,
      redirectUrl:
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname,
    };

    // setting payload
    if (searchParams?.qrcode) {
      const payload = {
        email: val.email,
        name: val.name,
        redirectUrl:
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname,
        identity: searchParams.qrcode,
        items: user
          ? data &&
            data.data.rows.map((item) => ({
              mealId: item.meal.id,
              quantity: item.quantity,
            }))
          : cart.cartItems.map((item) => ({
              mealId: item.id,
              quantity: item.cartQuantity,
            })),
      };
      localStorage.setItem("checkoutPayload", JSON.stringify(payload));
    } else {
      const payload = schedule
        ? {
            ...val,
            redirectUrl:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname,
            scheduledDate: schedule,
            scheduled: schedule ? true : false,
            items: user
              ? data &&
                data.data.rows.map((item) => ({
                  mealId: item.meal.id,
                  quantity: item.quantity,
                }))
              : cart.cartItems.map((item) => ({
                  mealId: item.id,
                  quantity: item.cartQuantity,
                })),
          }
        : {
            ...val,
            redirectUrl:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname,
            items: user
              ? data &&
                data.data.rows.map((item) => ({
                  mealId: item.meal.id,
                  quantity: item.quantity,
                }))
              : cart.cartItems.map((item) => ({
                  mealId: item.id,
                  quantity: item.cartQuantity,
                })),
          };
      // try {
      //   const response = await makeOrder(payload).unwrap();
      //   localStorage.setItem("tranRef", response.data.payment.paymentRef);
      //   window.open(response?.data?.payment?.data?.link, "_self");
      //   openNotification({
      //     type: "success",
      //     title: "Order",
      //     message: `Order made successfully`,
      //   });
      // } catch (err) {
      //   console.log(err);
      //   if (err.status === "FETCH_ERROR") {
      //     openNotification({
      //       type: "error",
      //       title: "Error",
      //       message: "an error occured",
      //     });
      //   } else {
      //     openNotification({
      //       type: "error",
      //       title: "Error",
      //       message: err.data.message,
      //     });
      //   }
      // }

      localStorage.setItem("checkoutPayload", JSON.stringify(payload));
    }
    // init payment
    try {
      const response = await initPayment(payloadinit).unwrap();
      setTimeout(() => {
        window.open(response?.data?.data?.link, "_self");
      }, 0);
      openNotification({
        type: "success",
        title: "Order",
        message: `Order made successfully`,
      });
      setLoad(false);
    } catch (err) {
      console.log(err);
      setLoad(false);
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
  useEffect(() => {
    methods.setValue("email", user.email);
    methods.setValue("name", user.name);
    methods.setValue("phone_number", user.phone);
    methods.setValue("address", user.deliveryAddress);
  }, [user]);
  // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  // JSON.parse(localStorage.getItem("cartItems"))
  return (
    <div className="pd_checkout_modal">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleCheckout)}>
          <div className="left_form">
            <InputField
              type="email"
              name="email"
              placeholder="rajimus@gmail.com"
              id="email"
              label="Email"
              errMsg="invalid  input"
            />

            <div className="form-group-wrap">
              <InputField
                type="text"
                name="name"
                placeholder=""
                id="name"
                label="Recepient's Name"
                errMsg="invalid input"
              />
              <InputField
                type="text"
                name="phone_number"
                placeholder=""
                id="phone"
                label="Recepient's Phone number"
                errMsg="invalid input"
              />
            </div>

            <Textbox
              name="address"
              placeholder=""
              id="address"
              label="Delivery Address (Full Address)"
              errMsg="invalid  input"
            />

            <div className="check_side">
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <p>Include Delivery (N 1,000)</p>
            </div>

            <div className="radio_side">
              <p className="label">Select Payment Method</p>
              <div className="pay_box">
                {payType.map((el, i) => (
                  <label
                    className={`each_box ${
                      paytype === el.name ? "active" : ""
                    } ${el.name === "card" ? "" : "disabled"} `}
                    key={i}
                    style={{ backgroundColor: el }}
                  >
                    <img src={el.image} alt="el" />
                    <p>{el.desc}</p>
                    <input
                      hidden
                      value={el.name}
                      type={"radio"}
                      name=""
                      // {...methods.register("type", {
                      //   required: "Select a payment Type",
                      //   onChange: (e) => {
                      //     handletype(e.target.value);
                      //   },
                      // })}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="right_form">
            <ShowCartSide isCheck={true} />
            {data && data.data.total ? (
              <SubmitBtn
                disabled={load}
                isLoading={isLoading}
                btnText={"Checkout"}
              />
            ) : (
              ""
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Checkoutmodal;

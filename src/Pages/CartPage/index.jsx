import BackArrowBox from "../../components/BackArrowBox";
import Navbar from "../../components/Navbar";
import { DeleteOutlined } from "@ant-design/icons";
import ShowCartSide from "../../components/ShowCartSide";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import Modal from "../../components/Modal";
import Checkoutmodal from "../../components/CheckoutModal";
import "./style.scss";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import {
  useClearUserCartOnlineMutation,
  useMakeOrderMutation,
  useMakeOrderQrMutation,
} from "../../services/api";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { openNotification } from "../../utils/helpers";
const CartPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [makeOrder, { isLoading }] = useMakeOrderMutation();
  const [makeOrderQr, { isLoading: isLoadingQr }] = useMakeOrderQrMutation();
  const [clearCart, { isLoading: clearload }] =
    useClearUserCartOnlineMutation();

  const clearCartOnline = async () => {
    try {
      const response = await clearCart().unwrap();
      openNotification({
        type: "success",
        title: "Order",
        message: `Cart Cleared successfully`,
      });
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
  const location = useLocation();
  const searchParams = queryString.parse(location.search);

  const handleMAkeOrder = async () => {
    let payload = JSON.parse(localStorage.getItem("checkoutPayload"));
    console.log(payload, "loaas");

    let dataValue = {
      ...payload,
      paymentRef: searchParams?.tx_ref,
      transactionRef: searchParams?.transaction_id,
    };
    try {
      const response = await makeOrder(dataValue).unwrap();

      openNotification({
        type: "success",
        title: "Order",
        message: `Order made successfully`,
      });
      clearCartOnline();
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

  useEffect(() => {
    if (searchParams?.tx_ref && searchParams?.transaction_id) {
      handleMAkeOrder();
    } else {
    }
  }, []);

  return (
    <>
      <div className="pd_cart_page">
        <Navbar bg={true} />
        <BackArrowBox>
          <p className="page_link">
            Home {">"} <span>Cart</span>
          </p>
        </BackArrowBox>
        <div className="main_side">
          <p className="page_title">My Cart</p>
          <div className="flex_cart">
            <div className="left_cart">
              <ShowCartSide
                hideTotal={true}
                setDeliveryFee={setDeliveryFee}
                setTotal={setTotal}
              />
            </div>
            <div className="right_cart">
              <p className="sum">Order Summary</p>
              <div className="each_sub">
                <p className="faint">Subtotal</p>
                <p className="bold">N{total}</p>
              </div>
              <div className="each_sub">
                <p className="faint">Delivery fee</p>
                <p className="bold">N{deliveryFee}</p>
              </div>

              <div className="line"></div>
              <div className="each_sub">
                <p className="faint">Total</p>
                <p className="bold">
                  {parseInt(total) + parseInt(deliveryFee)}
                </p>
              </div>

              <SubmitBtn
                disabled={false}
                isLoading={false}
                onClick={() => {
                  setOpenModal(true);
                }}
                btnText={"Proceed to Checkout"}
              />
            </div>
          </div>{" "}
        </div>

        <Modal closeModal={() => setOpenModal(false)} openModal={openModal}>
          <Checkoutmodal />
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;

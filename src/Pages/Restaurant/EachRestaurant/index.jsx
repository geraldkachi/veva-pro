import BackArrowBox from "../../../components/BackArrowBox";
import Navbar from "../../../components/Navbar";
import "./style.scss";
import resturant from "../../../assets/icons/rest.png";
import meal1 from "../../../assets/icons/meal1.png";
import AddToCart from "../../../components/AddToCart";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import StarRating from "../../../components/Star";
import { Progress, Skeleton } from "antd";
import { Grid } from "@mui/material";
import EachReviewer from "./eachReviewer";
import Footer from "../../../components/Footer";
import {
  useClearUserCartOnlineMutation,
  useGetMealsInRestaurantQuery,
  useGetOneRestaurantQuery,
  useMakeOrderMutation,
  useMakeOrderQrMutation,
  useVerifyOrderQuery,
} from "../../../services/api";
import { useLocation, useParams } from "react-router-dom";
import ShowCartSide from "../../../components/ShowCartSide";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SubmitBtn from "../../../components/SubmitBtn/SubmitBtn";
import Checkoutmodal from "../../../components/CheckoutModal";
import Modal from "../../../components/Modal";
import { openNotification } from "../../../utils/helpers";
import LoginModal from "../../../components/LoginModal";
import queryString from "query-string";
import { useGetUser } from "../../../hooks/getUserHook";
import Loading from "../../../components/Loading";
import EmptyResponse from "../../../components/EmptyResponse";
import SignupModal from "../../../components/SignupModal";
const EachRestaurant = (props) => {
  const { id } = useParams();

  const { user } = useGetUser();
  const location = useLocation();
  const [rerend, setRerend] = useState(true);
  const searchParams = queryString.parse(location.search);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);

  const [skip, setSkip] = useState(true);
  const [isClear, setisClear] = useState(false);
  const transactionDetail = localStorage.getItem("tranRef");
  const {
    data = null,
    isLoading,
    isError,
    error,
  } = useGetOneRestaurantQuery(id);
  const {
    data: meal = null,
    isLoading: mealLoading,
    isError: isMealError,
    error: mealError,
  } = useGetMealsInRestaurantQuery(id);

  // new order psot

  const [makeOrder, { isLoading: load }] = useMakeOrderMutation();
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
  const handleMAkeOrder = async () => {
    let payload = JSON.parse(localStorage.getItem("checkoutPayload"));
    console.log(payload, "loaas");
    if (payload.identity) {
      let dataValue = {
        ...payload,
        paymentRef: searchParams?.tx_ref,
        transactionRef: searchParams?.transaction_id,
      };
      try {
        const response = await makeOrderQr({
          credentials: dataValue,
          id: id,
        }).unwrap();
        openNotification({
          type: "success",
          title: "Order",
          message: `Order made successfully`,
        });
        clearCartOnline();
      } catch (err) {
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
    } else {
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
    }
  };

  useEffect(() => {
    if (searchParams?.tx_ref && searchParams?.transaction_id) {
      handleMAkeOrder();
    } else {
    }
  }, []);

  console.log(data, "ll");
  const [deliverytype, setDeliverytype] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  useEffect(() => {
    if (deliverytype === "immediately") {
      setDeliveryTime("");
    }
  }, [deliverytype]);
  const handleType = (e) => {
    setDeliverytype(e.target.value);
  };
  const {
    data: verifyData = null,
    isLoading: loadVerify,
    isError: isErrorVerify,
    error: errorVerify,
  } = useVerifyOrderQuery(
    { ref: transactionDetail },
    {
      skip,
    }
  );

  useEffect(() => {
    if (verifyData) {
      openNotification({
        type: "success",
        title: "Verify Order",
        message: `Your Order has been verified`,
      });
      localStorage.removeItem("tranRef");
      setisClear(true);
    }
  }, [verifyData]);
  useEffect(() => {
    if (errorVerify) {
      openNotification({
        type: "error",
        title: "Verify Order",
        message: "Verification unsuccessful",
      });
    }
  }, [errorVerify]);
  useEffect(() => {
    if (transactionDetail) {
      setSkip(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reviewList = [
    {
      image: meal1,
      name: "Raji Mustapha",
      date: new Date(),
      story:
        "Phasellus dignissim, tellus in pellentesque mollis, mauris orci dignissim nisl, id gravida nunc enim quis nibh. Maecenas convallis eros a ante dignissim, vitae elementum metus facilisis. Cras in maximus sem. Praesent libero augue, ornare eget quam sed, volutpat suscipit arcu.",
    },
    {
      image: meal1,
      name: "Raji Mustapha",
      date: new Date(),
      story:
        "Phasellus dignissim, tellus in pellentesque mollis, mauris orci dignissim nisl, id gravida nunc enim quis nibh. Maecenas convallis eros a ante dignissim, vitae elementum metus facilisis. Cras in maximus sem. Praesent libero augue, ornare eget quam sed, volutpat suscipit arcu.",
    },
    {
      image: meal1,
      name: "Raji Mustapha",
      date: new Date(),
      story:
        "Phasellus dignissim, tellus in pellentesque mollis, mauris orci dignissim nisl, id gravida nunc enim quis nibh. Maecenas convallis eros a ante dignissim, vitae elementum metus facilisis. Cras in maximus sem. Praesent libero augue, ornare eget quam sed, volutpat suscipit arcu.",
    },
    {
      image: meal1,
      name: "Raji Mustapha",
      date: new Date(),
      story:
        "Phasellus dignissim, tellus in pellentesque mollis, mauris orci dignissim nisl, id gravida nunc enim quis nibh. Maecenas convallis eros a ante dignissim, vitae elementum metus facilisis. Cras in maximus sem. Praesent libero augue, ornare eget quam sed, volutpat suscipit arcu.",
    },
    {
      image: meal1,
      name: "Raji Mustapha",
      date: new Date(),
      story:
        "Phasellus dignissim, tellus in pellentesque mollis, mauris orci dignissim nisl, id gravida nunc enim quis nibh. Maecenas convallis eros a ante dignissim, vitae elementum metus facilisis. Cras in maximus sem. Praesent libero augue, ornare eget quam sed, volutpat suscipit arcu.",
    },
  ];
  return (
    <>
      {isLoading && <Loading full />}
      {data && (
        <div className="pd_each_restaurant">
          <Navbar bg={true} />
          <BackArrowBox>
            <p className="page_link">
              Home {">"} Restaurant {">"} <span>Meal</span>
            </p>
          </BackArrowBox>
          <div className="top_section">
            <div className="rest_pictures">
              <img
                src={
                  data && data.data.images[0] ? data.data.images[0] : resturant
                }
                alt="rest"
                className="big_picture"
              />
              <div className="smaller_pic">
                <div className="small_pic_box">
                  <img
                    src={
                      data && data.data.images[1]
                        ? data.data.images[1]
                        : resturant
                    }
                    alt="rest"
                    className="small_picture"
                  />
                </div>
                <div className="small_pic_box">
                  <img
                    src={
                      data && data.data.images[2]
                        ? data.data.images[2]
                        : resturant
                    }
                    alt="rest"
                    className="small_picture"
                  />{" "}
                </div>
                <div className="small_pic_box">
                  <img
                    src={
                      data && data.data.images[3]
                        ? data.data.images[3]
                        : resturant
                    }
                    alt="rest"
                    className="small_picture two"
                  />
                </div>
                <div className="small_pic_box">
                  <img
                    src={
                      data && data.data.images[0]
                        ? data.data.images[0]
                        : resturant
                    }
                    alt="rest"
                    className="small_picture two"
                  />
                </div>
              </div>
            </div>
            <div className="about_restaurant">
              <div className="restaurant_box">
                <div className="cover_img">
                  <img
                    src={data && data.data.logo ? data.data.logo : resturant}
                    alt="rest"
                  />{" "}
                </div>
                <div className="rest_desc">
                  <p className="rest_name">{data && data.data.name}</p>
                  <p className="rest_address">{data && data.data.address}</p>
                  <div className="btm_side">
                    <p className="reviews">
                      {" "}
                      <span>{data && data.data.contactEmail}</span>{" "}
                    </p>
                    <p className="delivery">
                      {" "}
                      <span>{data && data.data.contactPhone} </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="second_section">
            <div className="adding_side">
              {!meal ? (
                <EmptyResponse message={"No Meals yet"} />
              ) : !meal.data.rows.length ? (
                <EmptyResponse message={"No Meals yet"} />
              ) : (
                meal.data.rows.map((item) => {
                  return <AddToCart key={item.id} meal={item} />;
                })
              )}
              {mealLoading && <Skeleton></Skeleton>}
            </div>
            <div className="order_side">
              <p className="head_side">Orders</p>
              <ShowCartSide isClear={isClear} />
              <div className="radio_side">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="immediately"
                    value={deliverytype}
                    name="radio-buttons-group"
                    onChange={handleType}
                  >
                    <FormControlLabel
                      value="immediately"
                      control={<Radio />}
                      label="Deliver Meal immediately"
                    />
                    <FormControlLabel
                      value="schedule"
                      control={<Radio />}
                      label="Schedule Meal delivery"
                    />
                  </RadioGroup>
                </FormControl>
                {deliverytype === "schedule" && (
                  <div className="form-group">
                    <div className="input-icon-wrap">
                      <input
                        onChange={(e) => {
                          setDeliveryTime(e.target.value);
                        }}
                        type="datetime-local"
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                )}
                <SubmitBtn
                  disabled={false}
                  isLoading={false}
                  btnText={"Proceed to checkout"}
                  onClick={() => {
                    if (searchParams?.qrcode) {
                      setOpenModal(true);
                    } else if (user) {
                      setOpenModal(true);
                    } else {
                      setOpenModalLogin(true);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="about_rest">
            <p className="bold">About Restaurants</p>
            <div className="img_box">
              <div className="cover_img">
                <img
                  src={data && data.data.logo ? data.data.logo : resturant}
                  alt="restaurant"
                />
              </div>
              <p className="name">{data && data.data.name}</p>
            </div>

            <p className="rest_desc">{data && data.data.description}</p>
            <a href={`tel:${data && data.data.contactPhone}`} className="call">
              <PhoneInTalkIcon />
              Contact Restaurant
            </a>
          </div>

          {/* <div className="review_rest">
            <p className="bold">Review</p>

            <div className="exp_review">
              <p className="rate">4.0</p>
              <StarRating disabled={true} stars={3} />
              <div className="vert_line"></div>
              <p className="number">487 Reviews</p>
            </div>

            <div className="review_breakdown">
              <div className="each_break">
                <p className="number">5 star</p>
                <Progress
                  percent={80}
                  className="ml-4"
                  strokeColor="#ffcd36"
                  strokeLinecap="square"
                  showInfo={false}
                />
              </div>
              <div className="each_break">
                <p className="number">4 star</p>
                <Progress
                  percent={60}
                  className="ml-4"
                  strokeColor="#ffcd36"
                  strokeLinecap="square"
                  showInfo={false}
                />
              </div>
              <div className="each_break">
                <p className="number">3 star</p>
                <Progress
                  percent={100}
                  className="ml-4"
                  strokeColor="#ffcd36"
                  strokeLinecap="square"
                  showInfo={false}
                />
              </div>
              <div className="each_break">
                <p className="number">2 star</p>
                <Progress
                  percent={20}
                  className="ml-4"
                  strokeColor="#ffcd36"
                  strokeLinecap="square"
                  showInfo={false}
                />
              </div>
              <div className="each_break">
                <p className="number">1 star</p>
                <Progress
                  percent={40}
                  className="ml-4"
                  strokeColor="#ffcd36"
                  strokeLinecap="square"
                  showInfo={false}
                />
              </div>
            </div>
          </div>

          <div className="reviewers">
            <Grid container spacing={4} mt={1}>
              {reviewList.map((item, i) => {
                return (
                  <Grid key={i} item xs={12} sm={6} md={6} lg={6}>
                    <EachReviewer review={item} />
                  </Grid>
                );
              })}
            </Grid>
          </div> */}
        </div>
      )}
      <Footer />
      <Modal
        closeModal={() => setOpenModal(false)}
        openModal={openModal}
        title={""}
      >
        <Checkoutmodal store={id} schedule={deliveryTime} />
      </Modal>
      <Modal
        closeModal={() => setOpenModalLogin(false)}
        openModal={openModalLogin}
        title={"Login"}
      >
        <LoginModal
          store={id}
          closeSelf={setOpenModalLogin}
          setSignModal={setOpenModal2}
          setRerend={setRerend}
          setOpenModal={setOpenModal}
        />
      </Modal>
      <Modal
        closeModal={() => setOpenModalLogin(false)}
        openModal={openModal2}
        title={"Sign up"}
      >
        <SignupModal
          closeSelf={setOpenModal2}
          closeModal={() => setOpenModal2(false)}
          openLogin={setOpenModalLogin}
          openModal={openModal2}
          title={"Signup"}
        />
      </Modal>
    </>
  );
};

export default EachRestaurant;

import logo from "../../assets/icons/logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import wallet from "../../assets/icons/wallet.svg";
import cart from "../../assets/icons/cart.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./style.scss";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import LoginModal from "../LoginModal";
import SignupModal from "../SignupModal";
import { useGetUser } from "../../hooks/getUserHook";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectToken } from "../../store/slice/AuthSlice";
import { clearCart, getTotals } from "../../store/slice/CartSlice";
import { openNotification } from "../../utils/helpers";
import {
  useAddToUserCartOnlineMutation,
  useGetUserCartOnlineQuery,
} from "../../services/api";
import { Dropdown } from "antd";
import Notification from "../Notifications";
import { Link, useNavigate } from "react-router-dom";
import Hamburger from "../Hamburger";
import SearchModal from "../SearchModal";
import ResetMailModal from "../ResetMailModal";
const Navbar = ({ bg }) => {
  const isLoggedIn = false;
  const [openModal, setOpenModal] = useState(false);
  const [openModalRecover, setOpenModalRecover] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const { user } = useGetUser();
  const [isNavOpen, setisNavOpen] = useState(false);
  const navigate = useNavigate();
  const [rerend, setRerend] = useState(true);
  const [isShowNot, setIsShowNot] = useState(false);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const [skip, setSkip] = useState(true);
  const [addToCart, { isLoading: loadAdd }] = useAddToUserCartOnlineMutation();
  const {
    data = null,
    isLoading,
    isError,
    error,
  } = useGetUserCartOnlineQuery(
    {},
    {
      skip,
    }
  );
  const logoutHandler = () => {
    dispatch(logOut());
    navigate("/");
    setIsShowNot(false);
  };
  useEffect(() => {
    if (user !== null) {
      console.log(user);
      setSkip(false);
    }
  }, [user]);
  const handleAdd = async (val, name) => {
    console.log(val);
    try {
      const response = await addToCart(val).unwrap();

      openNotification({
        type: "success",
        title: "Increase Cart Quantity",
        message: `${name} added to cart`,
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
  const dispatch = useDispatch();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  useEffect(() => {
    dispatch(getTotals());
  }, []);

  useEffect(() => {
    if (user) {
      if (cartItems.length) {
        console.log(cartItems, "lol");
        cartItems.forEach((item) => {
          handleAdd(
            {
              meal: item.meal.id,
              quantity: item.cartQuantity,
            },
            item.meal.name
          );
        });
        dispatch(clearCart());
      }
    }
  }, [user]);

  return (
    <div className={`pd_navbar ${bg ? "white_bg" : ""}`}>
      <div className="cover_nav">
        <div className="left_logo_side">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="logo_cover"
          >
            <img src={logo} alt="logo" />
            <p>Veva</p>
          </div>
          <Hamburger
            handleClick={() => {
              {
                setisNavOpen(!isNavOpen);
              }
            }}
          />
          <div
            onClick={() => {
              setOpenModal3(true);
            }}
            className="btn_search"
          >
            <SearchIcon />
            <p>Search meal or restaurants</p>
          </div>
        </div>
        <div className={`right_logo_side ${isNavOpen ? "nav-opened" : ""}`}>
          <div className={`contain_left ${user ? "logged_in" : "logged_out"}`}>
            {user ? (
              <>
                <div className="nav_list_side">
                  {/* <Link className="each_nav_item" to="/">
                    Vwallet
                  </Link> */}
                  <Link className="each_nav_item" to="/cart">
                    Cart
                  </Link>
                  <Link className="each_nav_item" to="/orders">
                    Orders
                  </Link>
                  <Link className="each_nav_item" to="/profile">
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setOpenModal3(true);
                    }}
                    className="each_nav_item"
                    to="/cart"
                  >
                    Search Meals/Restaurant
                  </button>
                  <button
                    onClick={logoutHandler}
                    className="each_nav_item"
                    to="/cart"
                  >
                    Log Out
                  </button>
                </div>

                <div className="cover_loggedin">
                  <div className="each_icon_box wallet">
                    {/* <img src={wallet} alt="wallet" /> */}
                    <div className="text">
                      {/* <p>My V-Wallet</p>
                      <span className="number">4</span> */}
                    </div>
                  </div>
                  <div className="cover_other">
                    <Link to={"/cart"} className="each_icon_box cart">
                      <img src={cart} alt="wallet" />
                      <div className="text">
                        <p>My Cart</p>
                        {data && data.data.total > 0 ? (
                          <span className="number">
                            {data && data.data.total}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </Link>
                    <div className="vert_line"></div>

                    <div className="about_user">
                      <>
                        <div
                          onClick={() => {
                            setIsShowNot(!isShowNot);
                          }}
                          className="cover_avatar"
                        >
                          <Avatar
                            alt={""}
                            src={user ? user.image : ""}
                            sx={{ width: 40, height: 40 }}
                          />
                          <div className="desc">
                            <p className="name">
                              {`${user.firstName} ${user.lastName}`}
                            </p>
                          </div>
                          <ArrowDropDownIcon />{" "}
                        </div>
                        {isShowNot && (
                          <Notification setIsShowNot={setIsShowNot} />
                        )}{" "}
                      </>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="cover_button">
                <button
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  className="log"
                >
                  Login
                </button>
                <p className="vert_line"></p>
                <button
                  onClick={() => {
                    setOpenModal2(true);
                  }}
                  className={`sign ${isLoggedIn ? "yellow" : "black"}`}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        closeModal={() => setOpenModal(false)}
        openModal={openModal}
        title={"Login"}
      >
        <LoginModal
          closeSelf={setOpenModal}
          setSignModal={setOpenModal2}
          setRerend={setRerend}
          setisNavOpen={setisNavOpen}
          openRecover={setOpenModalRecover}
        />
      </Modal>
      <Modal
        closeModal={() => setOpenModal2(false)}
        openModal={openModal2}
        title={"Signup"}
      >
        <SignupModal openLogin={setOpenModal} closeSelf={setOpenModal2} />
      </Modal>
      <Modal
        closeModal={() => setOpenModalRecover(false)}
        openModal={openModalRecover}
        title={"Reset Password"}
      >
        <ResetMailModal
          openLogin={setOpenModal}
          closeSelf={setOpenModalRecover}
        />
      </Modal>
      <Modal
        closeModal={() => setOpenModal3(false)}
        openModal={openModal3}
        title={""}
      >
        <SearchModal closeSelf={() => setOpenModal3(false)} />
      </Modal>
    </div>
  );
};

export default Navbar;

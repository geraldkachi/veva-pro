import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Dish from "../../assets/icons/dish.svg";
import Family from "../../assets/icons/family.svg";
import Logout from "../../assets/icons/logout.svg";

import "./index.scss";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/slice/AuthSlice";

export default function Notification({ setIsShowNot }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    navigate("/");
    dispatch(logOut());
    setIsShowNot(false);
  };
  return (
    <div id="notification" className="show">
      {/* Dishes */}
      <NavLink to="/orders" className="item d-flex align-items-center">
        <img src={Dish} alt="Dish" height={30} />
        <div className="ml-4 left_shift">
          <p className="font-weight-bold  mb-0 text-black">My Order List</p>
          <p className="va-text-secondary  mb-0">View all orders</p>
        </div>
        {/* <span className='count ml-auto mt-auto text-center'>6</span> */}
      </NavLink>
      {/* Family and friends */}
      <NavLink
        to="/family-and-friends"
        className="item d-flex align-items-center"
      >
        <img src={Family} alt="Family and Friends" height={30} />
        <div className="ml-4 left_shift">
          <p className="font-weight-bold  text-black mb-0">
            My Family and Friends
          </p>
          <p className="va-text-secondary t mb-0">View Family and Friends</p>
        </div>
        {/* <span className='count ml-auto mt-auto text-center'>6</span> */}
      </NavLink>
      {/* Family and friends */}
      <NavLink to="/profile" className="item d-flex align-items-center">
        <img src={Family} alt="Profile" height={30} />
        <div className="ml-4 left_shift">
          <p className="font-weight-bold  text-black mb-0">My Profile</p>
          <p className="va-text-secondary  mb-0">View Profile Details</p>
        </div>
      </NavLink>
      {/* Logout */}
      <button
        className="item d-flex align-items-center bg-white"
        onClick={logoutHandler}
      >
        <img src={Logout} alt="Logout" height={30} />
        <div className="ml-4 left_shift">
          <p className="font-weight-bold  mb-0">Logout</p>
          <p className="va-text-secondary  mb-0">Log out of the app</p>
        </div>
      </button>
    </div>
  );
}

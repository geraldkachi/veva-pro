import { combineReducers } from "@reduxjs/toolkit";
import { reducer as toastrReducer } from "react-redux-toastr";
import AuthReducer from "./slice/AuthSlice";
import { authApi } from "../services";
import ProductReducer from "./slice/ProductSlice";
import CartReducer from "./slice/CartSlice";
const rootReducer = combineReducers({
  //Shared Reducers
  products: ProductReducer,
  toastr: toastrReducer,
  auth: AuthReducer,
  cart: CartReducer,
  [authApi.reducerPath]: authApi.reducer,
});
export default rootReducer;

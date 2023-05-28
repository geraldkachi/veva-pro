import { createSlice } from "@reduxjs/toolkit";
import { openNotification } from "../../utils/helpers";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: localStorage.getItem("cartTotalQuantity")
    ? localStorage.getItem("cartTotalQuantity")
    : 0,
  cartTotalAmount: localStorage.getItem("cartTotalAmount")
    ? localStorage.getItem("cartTotalAmount")
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartOff(state, action) {
      // check if item is in cart

      const itemIndex = state.cartItems.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        openNotification({
          type: "success",
          title: "Add To Cart",
          message: `Increased ${action.payload.meal.name} Quantity`,
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        openNotification({
          type: "success",
          title: "Add To Cart",
          message: `${action.payload.meal.name} added successfully`,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      // check if item is in cart
      const itemIndex = state.cartItems.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        openNotification({
          type: "error",
          title: "Decrease Cart",
          message: `Decreased ${action.payload.meal.name} Cart Quantity`,
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;

        openNotification({
          type: "error",
          title: "Remove From Cart",
          message: `${action.payload.meal.name} removed successfully`,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      openNotification({
        type: "error",
        title: "Remove From Cart",
        message: `${action.payload.meal.name} removed successfully`,
      });
    },
    clearCart(state, action) {
      state.cartItems = [];
      // openNotification({
      //   type: "error",
      //   title: "Clear cart",
      //   message: `$Cart cleared successfully`,
      // });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = parseInt(price) * parseInt(cartQuantity);

          cartTotal.total += parseInt(itemTotal);
          cartTotal.quantity += parseInt(cartQuantity);
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
      localStorage.setItem("cartTotalQuantity", state.cartTotalQuantity);
      localStorage.setItem("cartTotalAmount", state.cartTotalAmount);
    },
  },
});

export const {
  addToCartOff,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotals,
} = cartSlice.actions;

const { actions, reducer } = cartSlice;

export default reducer;

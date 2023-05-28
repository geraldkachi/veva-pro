import { DeleteOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUser } from "../../hooks/getUserHook";
import {
  useAddToUserCartOnlineMutation,
  useClearUserCartOnlineMutation,
  useDeleteUserCartOnlineMutation,
  useGetUserCartOnlineQuery,
} from "../../services/api";
import { selectToken } from "../../store/slice/AuthSlice";
import {
  decreaseCart,
  removeFromCart,
  clearCart,
  getTotals,
  addToCartOff,
} from "../../store/slice/CartSlice";
import { openNotification } from "../../utils/helpers";
import EmptyResponse from "../EmptyResponse";
import "./style.scss";
const ShowCartSide = ({
  isCheck = false,
  isClear,
  setDeliveryFee,
  hideTotal = false,
  setTotal,
}) => {
  const cart = useSelector((state) => state.cart);
  const deliveryFee = 500;
  const { user } = useGetUser();
  const [skip, setSkip] = useState(true);
  const {
    data = null,
    isLoading,
    isError,
    error,
  } = useGetUserCartOnlineQuery({}, { skip });
  useEffect(() => {
    if (user) {
      setSkip(false);
    }
  }, [user]);

  const dispatch = useDispatch();
  // offline functions
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);
  const handleIncreaseCart = (item) => {
    dispatch(addToCartOff(item));
  };
  const handleDecreaseCart = (item) => {
    dispatch(decreaseCart(item));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const [clearCart, { isLoading: clearLoad }] =
    useClearUserCartOnlineMutation();
  const handleClearOnline = async () => {
    try {
      const response = await clearCart().unwrap();
      openNotification({
        type: "error",
        title: "Clear Cart",
        message: `Cart cleared`,
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
  useEffect(() => {
    if (isClear) {
      handleClearOnline();
    }
  }, [isClear]);

  useEffect(() => {
    // setDeliveryFee && setDeliveryFee(500);
    if (user) {
      if (data) {
        setTotal && setTotal(data.data.totalCartAmt);
      }
    } else {
      setTotal && setTotal(cart.cartTotalAmount);
    }
  }, [user, data]);

  const [addToCart, { isLoading: loadAdd }] = useAddToUserCartOnlineMutation();
  const [removeCart, { isLoading: loadRemove }] =
    useDeleteUserCartOnlineMutation();
  const handleAdd = async (val, name, type) => {
    console.log(val);
    try {
      const response = await addToCart(val).unwrap();
      if (type === "increase") {
        openNotification({
          type: "success",
          title: "Increase Cart Quantity",
          message: `Increased ${name} Quantity`,
        });
      } else {
        openNotification({
          type: "error",
          title: "Decrease Cart Quantity",
          message: `${name} descreased successfully`,
        });
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
  const handleRemove = async (val, name) => {
    console.log(val);
    try {
      const response = await removeCart(val).unwrap();

      console.log(response);
      openNotification({
        type: "error",
        title: "Remove From Cart",
        message: `${name} removed successfully`,
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

  return (
    <>
      {user && (loadAdd || loadRemove || isLoading) && <Skeleton></Skeleton>}
      <div className="pd_show_cart_side">
        <>
          {user === null ? (
            cart.cartItems.length ? (
              cart.cartItems.map((item, i) => {
                return (
                  <div key={i} className="each_cart">
                    <p className="name">{item.meal.name}</p>
                    <p className="price">{item.price}</p>
                    <div className="cover_count">
                      <button
                        type="button"
                        onClick={() => {
                          handleDecreaseCart(item);
                        }}
                        className="count"
                      >
                        -
                      </button>
                      <p className="quantity">{item.cartQuantity}</p>
                      <button
                        type="button"
                        onClick={() => {
                          handleIncreaseCart(item);
                        }}
                        className="count"
                      >
                        +
                      </button>
                    </div>
                    <div
                      onClick={() => {
                        handleRemoveFromCart(item);
                      }}
                      className="delBtn"
                    >
                      <DeleteOutlined />
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyResponse message={"Empty Cart"} />
            )
          ) : (
            ""
          )}

          {user && !loadAdd && !loadRemove && !isLoading ? (
            data ? (
              data.data.rows.length ? (
                data.data.rows.map((item, i) => {
                  return (
                    <div className="each_cart" key={i}>
                      <p className="name">{item.meal.name}</p>
                      <p className="price">{item.amount}</p>
                      <div className="cover_count">
                        <button
                          onClick={() => {
                            handleAdd(
                              {
                                meal: item.meal.id,
                                quantity: parseInt(item.quantity) - 1,
                              },
                              item.meal.name,
                              "decrease"
                            );
                          }}
                          type="button"
                          className="count"
                          disabled={item.quantity === 1 ? true : false}
                        >
                          -
                        </button>
                        <p className="quantity">{item.quantity}</p>
                        <button
                          onClick={() => {
                            handleAdd(
                              {
                                meal: item.meal.id,
                                quantity: parseInt(item.quantity) + 1,
                              },
                              item.meal.name,
                              "increase"
                            );
                          }}
                          type="button"
                          className="count"
                        >
                          +
                        </button>
                      </div>
                      <div
                        onClick={() => {
                          handleRemove(item.id, item.meal.name);
                        }}
                        className="delBtn"
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyResponse message={"Empty Cart"} />
              )
            ) : (
              <EmptyResponse message={"Empty Cart"} />
            )
          ) : (
            ""
          )}

          {isCheck && !hideTotal && (
            <div className="sub_total">
              <p className="bold">
                {" "}
                Subtotal amount: N
                {user
                  ? data && data.data.totalCartAmt
                  : cart
                  ? cart.cartTotalAmount
                  : 0}
              </p>
              <p className="bold">
                {" "}
                Convenience Fee: N
                {user
                  ? data && parseInt(data.data.totalCartAmt) * 0.05
                  : cart
                  ? cart.cartTotalAmount * 0.05
                  : 0}
              </p>
              {/* <div className="faint">Deliver-fee - N500</div> */}
            </div>
          )}
          {isCheck && !hideTotal && (
            <div className="total_amount">
              <p>
                Total Amount : N{" "}
                {user
                  ? data &&
                    parseInt(data.data.totalCartAmt) +
                      parseInt(data.data.totalCartAmt) * 0.05
                  : cart
                  ? cart.cartTotalAmount + cart.cartTotalAmount * 0.05
                  : 0}
              </p>
            </div>
          )}
          {!isCheck && !hideTotal && (
            <div className="total_amount">
              <p>
                Total Amount : N{" "}
                {user
                  ? data && data.data.totalCartAmt
                  : cart
                  ? cart.cartTotalAmount
                  : 0}
              </p>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default ShowCartSide;

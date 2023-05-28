import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUser } from "../../hooks/getUserHook";
import {
  useAddToUserCartOnlineMutation,
  useClearUserCartOnlineMutation,
} from "../../services/api";
import { addToCartOff } from "../../store/slice/CartSlice";
import { openNotification } from "../../utils/helpers";
import "./style.scss";
const AddToCart = ({ meal, isClear }) => {
  const { user } = useGetUser();

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCartOff(product));
  };

  const [addToCart, { isLoading: loadAdd }] = useAddToUserCartOnlineMutation();
  const handleAdd = async (val, name) => {
    try {
      const response = await addToCart(val).unwrap();

      openNotification({
        type: "success",
        title: "Add to Cart",
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
  return (
    <>
      {meal.meal && (
        <div className="pd_add_to_cart">
          <img
            src={
              meal.meal.front_image
                ? meal.meal.front_image
                : meal.meal.images[0]
            }
            alt="banner"
          />
          <div className="meal_desc">
            <div className="name_side">
              <p className="name">{meal.meal.name}</p>
              <p className="desc">{meal.meal.description}</p>
            </div>
            <div className="desc_side">
              <p className="price">{meal.meal.price}</p>
              <button
                onClick={() => {
                  if (user !== null) {
                    handleAdd(
                      { meal: meal.meal.id, quantity: 1 },
                      meal.meal.name
                    );
                  } else {
                    handleAddToCart(meal);
                  }
                }}
                className="add"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCart;

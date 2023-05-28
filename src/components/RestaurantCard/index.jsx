import StarRating from "../Star";
import "./style.scss";
import pop1 from "../../assets/icons/pop1.png";
import { useNavigate } from "react-router-dom";
const RestaurantCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/restaurant/${item.id}/meals`);
      }}
      className="pd_restaurant_card"
    >
      <img
        src={
          item
            ? item.business
              ? item.business.logo
                ? item.business.logo
                : pop1
              : pop1
            : pop1
        }
        style={{ borderRadius: "5px" }}
        alt="restaurant"
      />
      <div className="right_end">
        <p className="name">{item.name}</p>
        <p className="desc">{`${item.description.slice(0, 40)}...`}</p>
        <div className="rate_box">
          <p className="rate_number">{item.rating}</p>
          <StarRating disabled={true} stars={item.rating} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

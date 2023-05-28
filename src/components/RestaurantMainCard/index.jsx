import StarRating from "../Star/index";
import "./style.scss";
import meal1 from "../../assets/icons/meal1.png";
import { useNavigate } from "react-router-dom";
const RestaurantMainCard = ({ item }) => {
  const navigate = useNavigate();
  const gotoRestaurant = () => {
    navigate(`/restaurant/${item.id}/meals`);
  };
  return (
    <div onClick={gotoRestaurant} className="pd_restaurant_main_card">
      <div
        className="img_bg"
        style={{
          backgroundImage: `url(${item.images[0] ? item.images[0] : meal1})`,
        }}
      ></div>
      <div className="white_part">
        <div className="about_image">
          <p>{item.name}</p>
        </div>
        <StarRating
          disabled={true}
          stars={item.rating}
          //   onChange={handleTimely}
        />
      </div>
    </div>
  );
};

export default RestaurantMainCard;

import { useNavigate } from "react-router-dom";
import { truncateString } from "../../utils/utils";
import StarRating from "../Star/index";
import "./style.scss";
const MealCard = ({ meal }) => {
  const navigate = useNavigate();
  const gotoRestaurant = () => {
    navigate(`/restaurant/${meal.merchantUser.store}/meals`);
  };
  return (
    <div className="pd_meal_card">
      <div
        className="img_bg"
        onClick={() => {
          gotoRestaurant();
        }}
        style={{
          backgroundImage: `url(${meal.images[0]})`,
        }}
      ></div>
      <div className="white_part">
        <div className="about_image">
          <p>{truncateString(meal.name, 20)}</p>
          <p>N{meal.price}</p>
        </div>
        <p>Tag: {meal.tags[0].name}</p>
        <p className="desc"> {meal.description.slice(0, 35)}...</p>
        <StarRating
          disabled={true}
          stars={meal.rating}
          //   onChange={handleTimely}
        />
      </div>
    </div>
  );
};

export default MealCard;

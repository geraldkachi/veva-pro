import "./style.scss";
import { ReactComponent as Pasta } from "../../assets/icons/pasta.svg";
import { ReactComponent as Dinner } from "../../assets/icons/dinner.svg";
import { Link } from "react-router-dom";
const SelectMealOrRestaurant = ({ active }) => {
  return (
    <div className="pd_select_meal_or_restaurant">
      <Link
        to="/meals"
        className={`each_select ${active === "meal" ? "active" : ""}`}
      >
        <Pasta className="dinner" />
        <p>Meals</p>
      </Link>
      <div className="vertical"></div>
      <Link
        to="/restaurants"
        className={`each_select ${active === "restaurant" ? "active" : ""}`}
      >
        <Dinner className="dinner" />
        <p>Restaurants</p>
      </Link>
    </div>
  );
};

export default SelectMealOrRestaurant;

import { useState } from "react";
import "./style.scss";
import MealPick from "./widget/meal";
import RestPick from "./widget/restaurant";
const SearchModal = ({ closeSelf }) => {
  const [filter, setFilter] = useState("meals");
  return (
    <div className="pd_search_modal">
      <p className="explain">Select to search by either restaurant or meal</p>
      <div className="filter_box">
        <button
          className={`each_filter ${filter === "meals" ? "active" : ""}`}
          onClick={() => {
            setFilter("meals");
          }}
        >
          Meals
        </button>
        <button
          className={`each_filter ${filter === "restaurant" ? "active" : ""}`}
          onClick={() => {
            setFilter("restaurant");
          }}
        >
          Restaurants
        </button>
      </div>

      {filter === "meals" && <MealPick closeSelf={closeSelf} />}
      {filter === "restaurant" && <RestPick closeSelf={closeSelf} />}
    </div>
  );
};

export default SearchModal;

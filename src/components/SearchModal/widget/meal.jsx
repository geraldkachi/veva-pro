import "./style.scss";
import AsyncSelect from "react-select/async";
import { useState } from "react";
import SubmitBtn from "../../SubmitBtn/SubmitBtn";
import { openNotification } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";

const MealPick = ({ closeSelf }) => {
  const [foodSel, setFoodSel] = useState("");
  const [selFoodVal, setSelFoodVal] = useState("");
  const navigate = useNavigate();
  const handleInputChangeFood = (value) => {
    setFoodSel(value);
  };
  const onChangeFood = (value) => {
    setSelFoodVal(value);
  };
  const foodOptions = () => {
    return fetch(
      `https://api.getveva.co/api/v1/search/meals?name=${foodSel.toLocaleLowerCase()}&limit=10000&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        return data.data.meals.map((item) => ({
          label: `${item.meal.name}`,
          value: item.store,
        }));
      });
  };
  const submitSearch = () => {
    if (selFoodVal) {
      closeSelf();
      navigate(`/restaurant/${selFoodVal.value}/meals`);
    } else {
      openNotification({
        type: "error",
        title: "Error",
        message: "Input search value",
      });
    }
  };
  return (
    <div className="pd_meal_pick">
      <br />
      <br />
      <AsyncSelect
        cacheOptions
        defaultOptions
        placeholder="Search Meals"
        value={selFoodVal}
        loadOptions={foodOptions}
        onInputChange={handleInputChangeFood}
        onChange={onChangeFood}
      />
      <SubmitBtn
        onClick={() => {
          submitSearch();
        }}
        disabled={selFoodVal ? false : true}
        isLoading={false}
        btnText={"Search"}
      />
    </div>
  );
};

export default MealPick;

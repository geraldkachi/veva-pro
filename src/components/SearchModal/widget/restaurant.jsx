import "./style.scss";
import AsyncSelect from "react-select/async";
import { useState } from "react";
import SubmitBtn from "../../SubmitBtn/SubmitBtn";
import { openNotification } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";

const RestPick = ({ closeSelf }) => {
  const [restSel, setRestSel] = useState("");
  const [selRestVal, setSelRestVal] = useState("");
  const navigate = useNavigate();
  const handleInputChangeRest = (value) => {
    setRestSel(value);
  };
  const onChangeRest = (value) => {
    setSelRestVal(value);
  };
  const restOptions = () => {
    return fetch(
      `https://api.getveva.co/api/v1/merchant/stores/search?name=${
        restSel ? restSel.toLocaleLowerCase() : "a"
      }&limit=${100000}&page=${1}`
    )
      .then((response) => response.json())
      .then((data) => {
        return data.stores.rows.map((item) => ({
          label: `${item.name}`,
          value: item.id,
        }));
      });
  };
  const submitSearch = () => {
    if (selRestVal) {
      closeSelf();
      navigate(`/restaurant/${selRestVal.value}/meals`);
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
        placeholder="Search Restaurants"
        value={selRestVal}
        loadOptions={restOptions}
        onInputChange={handleInputChangeRest}
        onChange={onChangeRest}
      />
      <SubmitBtn
        onClick={() => {
          submitSearch();
        }}
        disabled={selRestVal ? false : true}
        isLoading={false}
        btnText={"Search"}
      />
    </div>
  );
};

export default RestPick;

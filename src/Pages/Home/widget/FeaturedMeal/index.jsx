import SectionTitle from "../../../../components/SectionTitle";
import "./style.scss";
import { useRef, useState } from "react";
import { Skeleton } from "antd";
import Slider from "react-slick";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import MealCard from "../../../../components/MealCard";
import meal1 from "../../../../assets/icons/meal1.png";
import meal2 from "../../../../assets/icons/meal2.png";
import { Link } from "react-router-dom";
import {
  useGetCategoryQuery,
  useGetMealsQuery,
} from "../../../../services/api";
import EmptyResponse from "../../../../components/EmptyResponse";
const FeaturedMeal = () => {
  const loading = false;
  const sliderRef = useRef();
  const [selectedCat, setSelectedCat] = useState({});
  const handleFilter = (item) => {
    setSelectedCat({
      name: item.name,
      id: item.id,
    });
  };

  const {
    data: meals = null,
    isLoading,
    isError,
    error,
  } = useGetMealsQuery({ page: 1, limit: 10, category: selectedCat.id });
  const { data: category = null } = useGetCategoryQuery();
  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };
  const handleNext = () => {
    sliderRef.current.slickNext();
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: meals
      ? meals.data.rows?.length >= 4
        ? 4
        : meals.data.rows?.length
      : 0,
    slidesToScroll: 4,
    speed: 200,
    // autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: meals
            ? meals.data.rows?.length >= 3
              ? 3
              : meals.data.rows?.length
            : 0,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: meals
            ? meals.data.rows?.length >= 2
              ? 2
              : meals.data.rows?.length
            : 0,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [foodList, setFoodList] = useState([
    { name: "Breakfast", id: 0 },
    { name: "Launch", id: 1 },
    { name: "Dinner", id: 2 },
    { name: "Snacks", id: 3 },
  ]);

  return (
    <div className="pd_featured">
      <SectionTitle
        title={"Tasty Meal Suggestions You Might Like"}
        subText={
          "Give yourself and your loved ones a treat with our tasty selection of meals, drinks and delicious gift packages."
        }
        center={true}
      />
      <div className="cover_meal">
        <div className="filter_box">
          {/* {foodList.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  handleFilter(item);
                }}
                className={`each_box ${
                  selectedCat.id === item.id ? "active" : ""
                }`}
              >
                <p>{item.name}</p>
                <div className="line"></div>
              </div>
            );
          })} */}

          {category &&
            category.data.rows.map((item, i) => {
              return (
                <div
                  key={i}
                  // onClick={() => {
                  //   setSelectedCat({
                  //     name: item.name,
                  //     id: item.id,
                  //   });
                  // }}
                  onClick={() => {
                    handleFilter(item);
                  }}
                  className={`each_box ${
                    selectedCat.id === item.id ? "active" : ""
                  }`}
                >
                  <p>{item.name}</p>
                </div>
              );
            })}
        </div>

        {meals && meals.data.rows.length ? (
          <Skeleton active loading={loading}>
            <Slider ref={sliderRef} {...settings}>
              {meals &&
                meals.data.rows.map((meal) => (
                  <MealCard
                    key={meal.id}
                    // to={`/restaurant/${meal.business}/${key}`}
                    meal={meal}
                  />
                ))}
            </Slider>

            <div className="arrow_box">
              <div className="black_line"></div>
              <span onClick={handlePrev} className="round">
                <CaretLeftOutlined />{" "}
              </span>
              <span onClick={handleNext} className="round">
                <CaretRightOutlined />{" "}
              </span>
            </div>
          </Skeleton>
        ) : (
          <EmptyResponse message={"No meals Available"} />
        )}

        <div className="view_box">
          <Link to="/meals" className="view">
            View all <CaretRightOutlined />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMeal;

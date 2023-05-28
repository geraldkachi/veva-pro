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
import { useGetMealsQuery } from "../../../../services/api";
import EmptyResponse from "../../../../components/EmptyResponse";
const GiftMeal = () => {
  const loading = false;
  const sliderRef = useRef();
  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };
  const {
    data: meals = null,
    isLoading,
    isError,
    error,
  } = useGetMealsQuery({
    page: 1,
    limit: 10,
    category: "6262986ffabc7ea3c0e64790",
  });
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

  return (
    <div className="pd_featured">
      <SectionTitle
        title={"Edible Gift Packages"}
        subText={
          "Send the perfect meal gifts or package to your friends or family"
        }
        center={true}
      />
      <div className="cover_meal">
        <Skeleton active loading={loading}>
          {meals && meals.data.rows.length ? (
            <Slider ref={sliderRef} {...settings}>
              {meals &&
                meals.data.rows.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
            </Slider>
          ) : (
            <EmptyResponse message={"No meals Available"} />
          )}

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

        <div className="view_box">
          <Link to="/meals" className="view">
            View all <CaretRightOutlined />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GiftMeal;

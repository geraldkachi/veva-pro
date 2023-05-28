import { useRef } from "react";
import SectionTitle from "../../../../components/SectionTitle";
import "./style.scss";
import Slider from "react-slick";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetRestaurantsQuery } from "../../../../services/api";
import bg_home from "../../../../assets/icons/bg_home.png";
const Awesome = () => {
  const sliderRef = useRef();
  const handleNext = () => {
    sliderRef.current.slickNext();
  };
  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1000,
    // autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const {
    data = null,
    isLoading,
    isError,
    error,
  } = useGetRestaurantsQuery({ page: 1, limit: 10 });
  const navigate = useNavigate();
  const gotoRestaurant = (id) => {
    navigate(`/restaurant/${id}/meals`);
  };
  return (
    <div className="pd_awesome">
      <div className="awesome_content">
        <div className="left">
          <SectionTitle
            title={"Find awesome restaurants"}
            subText={
              "With our selection of restaurants in Lagos, eating out has never been so tempting."
            }
          />
          <Link to="/restaurants" className="find">
            Find more Restaurants
          </Link>
        </div>

        <div className="right">
          <Slider ref={sliderRef} {...settings}>
            {data &&
              data.stores.rows.map((item, i) => {
                return (
                  <div
                    // className={`each_carousel ${i % 2 === 0 ? "one" : "two"}`}
                    className={`each_carousel  `}
                    onClick={() => {
                      gotoRestaurant(item.id);
                    }}
                  >
                    {i % 2 === 0 ? (
                      item.images && item.images[0] ? (
                        <img src={item.images[0]} alt="food" className="abs" />
                      ) : (
                        <img src={bg_home} alt="food" className="abs" />
                      )
                    ) : item.videoUrl ? (
                      <video
                        src={item.videoUrl}
                        muted
                        loop
                        autoPlay
                        className="abs"
                      ></video>
                    ) : (
                      <img src={bg_home} alt="food" className="abs" />
                    )}

                    <div className="black">
                      <p className="text">
                        {item.name} <br />
                        {item.description.slice(0, 50)}...
                      </p>
                    </div>
                  </div>
                );
              })}
          </Slider>
          <div className="caret_box">
            <div className="white_line"></div>
            <span onClick={handlePrev} className="round">
              <CaretLeftOutlined />{" "}
            </span>
            <span onClick={handleNext} className="round">
              <CaretRightOutlined />{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awesome;

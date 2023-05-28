import Navbar from "../../../../components/Navbar";
import YellowLine from "../../../../components/yellowline";
import "./style.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useGetMealsQuery } from "../../../../services/api";
import { Link, useNavigate } from "react-router-dom";
const Hero = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
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
    data: meals = null,
    isLoading,
    isError,
    error,
  } = useGetMealsQuery({ page: 1, limit: 10 });
  const navigate = useNavigate();
  console.log(meals);
  return (
    <div className="pd_hero">
      <div className="split_bg">
        <div className="black_side"></div>
        <div className="yellow_side"></div>
      </div>
      <Navbar />
      <div className="main_side">
        <div className="left_main">
          <YellowLine />
          <p className="rest_about">
            Mouthwatering <br />
            Food & Restaurant <br /> Experiences
          </p>
          <p className="desc">
            Satisfy your cravings and give yourself the perfect treat with our
            carefully
            <br />
            selected lineup of top-class restaurants and meals in Lagos.
          </p>
          <div className="yellow_arrow">
            <Link to="/meals" className="ord">
              ORDER NOW
            </Link>
          </div>
        </div>
        <div className="right_main">
          <Slider {...settings}>
            <div className="each_carousel one"></div>{" "}
            <div className="each_carousel two"></div>{" "}
            <div className="each_carousel three"></div>
          </Slider>
          <YellowLine />
        </div>
      </div>

      <div className="icon_box">
        <div className="straight_line"></div>
        <div className="icon_box_small">
          <a
            href="https://instagram.com/withveva?igshid=NmZiMzY2Mjc="
            className="each_icon"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.linkedin.com/company/withveva/"
            className="each_icon"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;

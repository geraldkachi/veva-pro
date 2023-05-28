import { CaretRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LatestMealDealsCarousel from "../../../../components/LatestMealDealsCarousel";
import "./style.scss";
const LatestPage = () => {
  return (
    <div className="pd_latest_page">
      <LatestMealDealsCarousel />
      <div className="view_box">
        <Link to="/" className="view">
          View all <CaretRightOutlined />
        </Link>
      </div>
    </div>
  );
};

export default LatestPage;

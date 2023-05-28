import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Modal from "../../components/Modal";
import ResetPasswordModal from "../../components/ResetPasswordModal";
import "./style.scss";
import Awesome from "./widget/Awesome";
import BestMeal from "./widget/BestMeal";
import FeaturedMeal from "./widget/FeaturedMeal";
import FitnessMealPlan from "./widget/FitnessMealPlan";
import GiftMeal from "./widget/GiftMeal";

import Hero from "./widget/Hero";
import LatestPage from "./widget/LatestMealDeal";
import PopularRestaurant from "./widget/Popular";
import SpecialEventsOcassion from "./widget/SpecialEvent";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
const Home = () => {
  const [openReset, setOpenReset] = useState(false);
  const location = useLocation();
  const token = queryString.parse(location.search);
  console.log(openReset);
  useEffect(() => {
    if (token.token) {
      setOpenReset(true);
    }
  }, []);
  return (
    <div className="pd_home">
      <Hero />
      <FeaturedMeal />
      <BestMeal />
      <Awesome />
      {/* <GiftMeal /> */}
      <PopularRestaurant />
      {/* <LatestPage /> */}
      <FitnessMealPlan />
      {/* <SpecialEventsOcassion /> */}
      <Footer />
      <Modal
        closeModal={() => setOpenReset(false)}
        openModal={openReset}
        title={"Reset Password"}
      >
        <ResetPasswordModal token={token.token} closeSelf={setOpenReset} />
      </Modal>
    </div>
  );
};

export default Home;

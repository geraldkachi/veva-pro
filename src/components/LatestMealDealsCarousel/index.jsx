import React from "react";
import Slider from "react-slick";
import { Link, NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { CaretRightOutlined } from "@ant-design/icons";
import LastestMealDeals from "../LatestMealDeals";
import "./index.scss";
import SectionTitle from "../SectionTitle";

export default function LatestMealDealsCarousel() {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container className="ve-slick-carousel">
      <Row>
        <Col>
          <SectionTitle
            title={"Appetizing Discounts and Offers"}
            subText={
              "Spoil yourself, not your wallet. Don’t miss out on our discount offers and deals."
            }
          />
        </Col>
      </Row>

      <Slider {...settings}>
        <div>
          <LastestMealDeals />
        </div>
        <div>
          <LastestMealDeals />
        </div>
        <div>
          <LastestMealDeals />
        </div>
        <div>
          <LastestMealDeals />
        </div>
        <div>
          <LastestMealDeals />
        </div>
        <div>
          <LastestMealDeals />
        </div>
      </Slider>
    </Container>
  );
}

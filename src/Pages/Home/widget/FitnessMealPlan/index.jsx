import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionTitle from "../../../../components/SectionTitle";
import "./index.scss";
import fitness from "../../../../assets/icons/fitness.png";
import YellowLine from "../../../../components/yellowline";
export default function FitnessMealPlan() {
  return (
    <div className="fitness-meal-plan position-relative">
      <Container>
        <div className="cover_fit">
          <div className="left_fit">
            <SectionTitle
              title={"Fitness meal plan"}
              subText={
                "Your cheat days are only as good as your diet days. Get and stay in shape with expertly created fitness meal plans."
              }
            />
            <div className="coming">
              <p>Coming Soon</p>
              <YellowLine />
            </div>
          </div>
          <div className="thumbnail ">
            <img src={fitness} alt="fitess" />
          </div>
        </div>
      </Container>
    </div>
  );
}

import React from "react";
import { Fragment } from "react";
import "./index.scss";

export default function HeadingWithShadow({
  mainText,
  shadowText,
  size,
  textClassNames = "",
  orientation = "start",
  marginTop = 0,
}) {
  return (
    <Fragment>
      <div className="position-relative" style={{ marginTop }}>
        <h1
          className={
            textClassNames + " shadow-text font-weight-bold text-barber"
          }
          style={{ fontSize: `${size + 2}rem`, opacity: 0.06 }}
        >
          {shadowText}
        </h1>
        <div className="main-wrapper w-100">
          <h1
            className={"font-weight-bold " + textClassNames}
            style={{ fontSize: `${size}rem` }}
          >
            {mainText}
          </h1>
        </div>

        <div className={"d-flex justify-content-" + orientation}>
          <span
            className="h-divider-primary d-inline-block"
            style={{ marginTop: "1rem" }}
          ></span>
        </div>
      </div>
    </Fragment>
  );
}

import { useEffect, useState } from "react";
import "./styles.scss";

// type Props = {
//   stars: number;
//   disabled: boolean;
//   starClass?: string;
//   onChange?: (rating: any) => void;
// };

const StarRating = ({ stars = 0, disabled = true, starClass, onChange }) => {
  const [rating, setRating] = useState(stars);
  const [hover, setHover] = useState(0);
  useEffect(() => {
    setRating(stars);
  }, [stars]);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => {
              !disabled && setRating(index);
              onChange && onChange(index);
            }}
            onMouseEnter={() => !disabled && setHover(index)}
            onMouseLeave={() => !disabled && setHover(rating)}
            style={disabled ? { cursor: "default" } : { cursor: "pointer" }}
          >
            <span className={`star ${starClass}`}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;

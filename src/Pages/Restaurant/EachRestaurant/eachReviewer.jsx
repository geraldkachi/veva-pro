import { Avatar } from "@mui/material";
import "./style.scss";
const EachReviewer = ({ review }) => {
  return (
    <div className="pd_each_reviewer">
      <Avatar
        alt={"review"}
        src={review.image}
        sx={{ width: 60, height: 60 }}
      />
      <div className="right_side">
        <p className="name">{review.name}</p>
        {/* <p className="date">{moment(review.date).format("ll")}</p> */}
        <p className="date">may 13, 2020</p>
        <p className="story">{review.story}</p>
      </div>
    </div>
  );
};

export default EachReviewer;

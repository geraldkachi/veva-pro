import "./style.scss";
import emptyBox from "../../assets/icons/emptyBox.svg";
const EmptyResponse = ({ image = emptyBox, message, btn, ...props }) => {
  return (
    <div {...props} className="empty-response-pg">
      <img src={image} alt="no result" />
      <p>{message}</p>
      {btn && btn}
    </div>
  );
};

export default EmptyResponse;

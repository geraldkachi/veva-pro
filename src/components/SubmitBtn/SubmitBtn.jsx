import "./style.scss";
const SubmitBtn = ({
  isLoading,
  btnText,
  className,
  style,
  disabled,
  icon,
  ...others
}) => {
  return (
    <button
      type="submit"
      style={style}
      className={`btn-primary submit-btn ${className ? className : ""} ${
        icon ? "icon" : ""
      } ${disabled || isLoading ? "disabled" : ""} `}
      disabled={disabled || isLoading}
      {...others}
    >
      {isLoading ? (
        <div className="spin" />
      ) : icon ? (
        <>
          {" "}
          <img src={icon} alt="lock" /> {btnText}{" "}
        </>
      ) : (
        btnText
      )}
    </button>
  );
};

export default SubmitBtn;

import "./style.scss";
const SectionTitle = ({ title, center = false, subText }) => {
  return (
    <div className={`pd_section_title ${center ? "center" : ""}`}>
      <p>{title}</p>
      <div className="underline"></div>
      {subText && <p className="sub_text">{subText}</p>}
    </div>
  );
};

export default SectionTitle;

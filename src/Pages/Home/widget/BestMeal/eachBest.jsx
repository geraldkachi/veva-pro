import "./style.scss";
const EachBestMeal = ({ item, name }) => {
  return (
    <div
      className="pd_each_best_meal"
      style={{ backgroundImage: `url(${item.image})` }}
    >
      <div className="dark">
        <p>{item.name}</p>
      </div>
    </div>
  );
};

export default EachBestMeal;

import SectionTitle from "../../../../components/SectionTitle";
import EachBestMeal from "./eachBest";
import "./style.scss";
import inter from "../../../../assets/icons/inter.png";
import street from "../../../../assets/icons/street.png";
import local from "../../../../assets/icons/local.png";

const BestMeal = () => {
  const bestlist = [
    { name: "Street food", id: 0, image: street },
    { name: "Local Dishes", id: 1, image: local },
    { name: "Continental Dishes", id: 2, image: inter },
  ];

  return (
    <div className="pd_best_meal">
      <SectionTitle
        title={"Amazing Meal Experiences Curated Just For You"}
        subText={
          "Foreign or Local. Fancy or simple. No matter your taste, there’s something for you."
        }
      />
      <div className="cover_best_flex">
        {bestlist.map((item) => {
          return <EachBestMeal item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default BestMeal;

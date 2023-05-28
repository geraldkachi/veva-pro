import "./style.scss";
import Navbar from "../../components/Navbar";
import SelectMealOrRestaurant from "../../components/SelectMealOrRestaurant";
import { useState } from "react";
import meal from "../../assets/icons/meal.png";
import { Grid } from "@mui/material";
import MealCard from "../../components/MealCard";
import Footer from "../../components/Footer";
import { useGetCategoryQuery, useGetMealsQuery } from "../../services/api";
import EmptyResponse from "../../components/EmptyResponse";
import Loading from "../../components/Loading";
const MealPage = () => {
  // const [category, setCategory] = useState([
  //   "All Meals",
  //   "Top Meals",
  //   "Street Food",
  //   "Local Food",
  //   "Continental",
  // ]);
  const [selectedCat, setSelectedCat] = useState({});
  const {
    data = null,
    isLoading,
    isError,
    error,
  } = useGetMealsQuery({ page: 1, limit: 1000, category: selectedCat.id });

  const { data: category = null } = useGetCategoryQuery();

  return (
    <div className="pd_meal_page">
      {isLoading && <Loading full />}
      <Navbar bg={true} />
      <div className="main_side">
        {isError && <EmptyResponse message={"Something went wrong"} />}
        {data && (
          <>
            <SelectMealOrRestaurant active={"meal"} />
            <div className="category_box">
              <p className="title">Category</p>
              <div className="list_category">
                <div
                  onClick={() => {
                    setSelectedCat({
                      name: "All Meals",
                      id: null,
                    });
                  }}
                  className={`each_cat ${
                    selectedCat.name === "All Meals" ? "active" : ""
                  }`}
                >
                  <p>All Meals</p>
                </div>
                {category &&
                  category.data.rows.map((item, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          setSelectedCat({
                            name: item.name,
                            id: item.id,
                          });
                        }}
                        className={`each_cat ${
                          selectedCat.id === item.id ? "active" : ""
                        }`}
                      >
                        <p>{item.name}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="cover_new_cat">
              <p>{selectedCat ? selectedCat.name : "All Meals"}</p>
            </div>
            <div className="intro_flex">
              <img src={meal} alt="meal" />
              <div className="desc_box">
                <p className="bold">Amazing and Fingerlicking Delicacies</p>
              </div>
            </div>
            <div className="main_meal">
              <p className="desc">
                {/* Integer ac interdum lacus. Nunc porta semper lacus a varius.
                Pellentesque habitant morbi tristique */}
              </p>
              <div className="meal_flex">
                {data.data.rows.length ? (
                  // <Grid container spacing={4} mt={1}>
                  // {data.data.rows.map((meal, i) => {
                  //   return (
                  //     <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  //       <MealCard key={meal.id} meal={meal} />
                  //     </Grid>
                  //   );
                  // })}
                  // </Grid>
                  <div className="flex_box">
                    {data.data.rows.map((meal, i) => {
                      return <MealCard key={meal.id} meal={meal} />;
                    })}
                  </div>
                ) : (
                  <EmptyResponse message={"No meals Available"} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MealPage;

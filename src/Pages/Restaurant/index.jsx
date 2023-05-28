import Navbar from "../../components/Navbar";
import SelectMealOrRestaurant from "../../components/SelectMealOrRestaurant";
import "./style.scss";
import meal1 from "../../assets/icons/meal1.png";
import meal2 from "../../assets/icons/meal2.png";
import YellowLine from "../../components/yellowline";
import { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import RestaurantMainCard from "../../components/RestaurantMainCard";
import { Grid } from "@mui/material";
import Footer from "../../components/Footer";
import { useGetRestaurantsQuery } from "../../services/api";
import EmptyResponse from "../../components/EmptyResponse";
import Loading from "../../components/Loading";
const Restaurant = () => {
  const {
    data = null,
    isLoading,
    isError,
    error,
  } = useGetRestaurantsQuery({ page: 1, limit: 1000 });

  return (
    <>
      {isLoading && <Loading full />}
      {isError && <EmptyResponse message={"Something went wrong"} />}
      {data && (
        <div className="pd_restaurant">
          <Navbar bg={true} />
          <div className="main_side">
            <SelectMealOrRestaurant active={"restaurant"} />
            <div className="banner">
              <div className="layer">
                <p>
                  Awesome Restaurants to <br /> Experience
                </p>
                <YellowLine />
              </div>
            </div>
            <div className="restaurant_main_box">
              <SectionTitle title={"Restaurants"} />
              {data.stores.rows.length ? (
                <Grid container spacing={4} mt={1}>
                  {data.stores.rows.map((item, i) => {
                    return (
                      <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                        <RestaurantMainCard key={item.id} item={item} />
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <EmptyResponse message={"No restaurants available"} />
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Restaurant;

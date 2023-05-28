import { Grid } from "@mui/material";
import SectionTitle from "../../../../components/SectionTitle";
import "./style.scss";
import pop1 from "../../../../assets/icons/pop1.png";
import pop2 from "../../../../assets/icons/pop2.png";
import RestaurantCard from "../../../../components/RestaurantCard";
import { useGetRestaurantsQuery } from "../../../../services/api";
const PopularRestaurant = () => {
  const {
    data = null,
    isLoading,
    isError,
    error,
  } = useGetRestaurantsQuery({ page: 1, limit: 10 });

  return (
    <div className="pd_popular_restaurant">
      <SectionTitle
        title={"Popular restaurants near you"}
        subText={
          "Filter by location and enjoy the best dining experience wherever you are!"
        }
      />
      <div className="cover_popular">
        <Grid container spacing={4} mt={1}>
          {data &&
            data.stores.rows
              .filter((item, i) => {
                return i < 8;
              })
              .map((item, i) => {
                return (
                  <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                    <RestaurantCard item={item} />
                  </Grid>
                );
              })}
        </Grid>
      </div>
    </div>
  );
};

export default PopularRestaurant;

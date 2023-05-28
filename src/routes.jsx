import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { useGetUser } from "./hooks/getUserHook";
import CartPage from "./Pages/CartPage";
import Home from "./Pages/Home";
import MealPage from "./Pages/Meals";
import { Orders } from "./Pages/Orders";
import { OrderDetail } from "./Pages/Orders/OrderDetail";
import { Profile } from "./Pages/Profile";
import Restaurant from "./Pages/Restaurant";
import EachRestaurant from "./Pages/Restaurant/EachRestaurant";
import { selectToken } from "./store/slice/AuthSlice";
function AllRoutes() {
  const { user } = useGetUser();
  const token = useSelector(selectToken);
  // const PrivateRoute = ({ children, type = "user" }) => {
  //   let location = useLocation();
  //   return (
  //     <>
  //       {user || token ? (
  //         children
  //       ) : (
  //         <Navigate
  //           to={`${type === "user" ? "" : "/admin"}/login?redirectTo=${
  //             location.pathname
  //           }`}
  //           state={{ from: location }}
  //         />
  //       )}
  //     </>
  //   );
  // };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meals" element={<MealPage />} />
        <Route path="/restaurants" element={<Restaurant />} />
        <Route path="/restaurant/:id/meals" element={<EachRestaurant />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:orderId" element={<OrderDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset-password" element={<Home />} />
        {/* Other routes not using admin layout should stay here e.g:*/}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default AllRoutes;

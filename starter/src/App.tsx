import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { AllRestaurants } from "./components/AllRestaurants/AllRestaurants";
import { RestaurantProvider } from "./context/RestaurantContext/RestaurantProvider";
import { RestaurantDetail } from "./components/RestaurantDetail/RestaurantDetail";
import { Favorites } from "./components/Favorites/Favorites";
import { Footer } from "./components/Footer/Footer";
import { SurpriseRestaurant } from "./components/SurpriseRestaurant/SurpriseRestaurant";
import { PopularRestaurants } from "./components/PopularRestaurants/PopularRestaurants";
import { Cuisines } from "./components/Cuisines/Cuisines";
import { CuisineDetail } from "./components/CuisinesDetail/CuisineDetail";

const App = () => {
  return (
    <>
      <div className="container-fuild mx-5">
        <Router>
          <Navbar />
          <RestaurantProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SurpriseRestaurant />
                    <PopularRestaurants />
                    <Cuisines />
                    <AllRestaurants />
                  </>
                }
              />
              <Route path="/restaurants/:id" element={<RestaurantDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cuisines/:cuisine" element={<CuisineDetail />} />
            </Routes>
          </RestaurantProvider>
          <Footer />
        </Router>
      </div>
    </>
  );
};

export default App;

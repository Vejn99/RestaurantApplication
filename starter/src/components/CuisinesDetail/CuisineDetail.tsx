import React from "react";
import { useParams } from "react-router-dom";
import { useRestaurantContext } from "../../context/RestaurantContext/RestaurantContext";
import { RestaurantCard } from "../RestaurantCard/RestaurantCard";
import "./CuisineDetail.css";

export const CuisineDetail = () => {
  const { restaurants } = useRestaurantContext();
  const { cuisine } = useParams();

  const filteredRestaurants = restaurants.filter(
    (restaurant) => restaurant.restauranttype === cuisine
  );

  return (
    <div className="py-5">
      <h2 className="text-center text-uppercase mb-4">{cuisine} Restaurants</h2>
      <div className="restaurantList">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
      </div>
    </div>
  );
};

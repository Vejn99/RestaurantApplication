import React from "react";
import { Link } from "react-router-dom";
import { useRestaurantContext } from "../../context/RestaurantContext/RestaurantContext";
import "./Cuisines.css";

export const Cuisines = () => {
  const { restaurants } = useRestaurantContext();

  const uniqueCuisines = Array.from(
    new Set(restaurants.map((restaurant) => restaurant.restauranttype))
  );

  const filteredCuisines = uniqueCuisines.filter(
    (cuisineType) => cuisineType !== undefined
  );

  return (
    <div className="text-center border-bottom py-5">
      <h2 className="text-uppercase mb-3">Cuisines</h2>
      {filteredCuisines.map((cuisineType, idx) => (
        <button className="cuisineBtn" key={idx}>
          <Link to={`/cuisines/${cuisineType}`}>{cuisineType}</Link>
        </button>
      ))}
    </div>
  );
};

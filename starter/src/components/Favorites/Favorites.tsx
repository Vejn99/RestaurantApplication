import React from "react";
import { useRestaurantContext } from "../../context/RestaurantContext/RestaurantContext";
import { RestaurantCard } from "../RestaurantCard/RestaurantCard";

export const Favorites = () => {
  const { restaurants, favorites } = useRestaurantContext();

  const favoriteRestaurants = restaurants.filter((restaurant) =>
    favorites?.includes(restaurant.id)
  );

  return (
    <div className="py-5">
      <h2 className="text-center text-uppercase mb-4">
        Your favorite restaurants
      </h2>
      {favoriteRestaurants.map((restaurant) => (
        <div className="my-3">
          <RestaurantCard key={restaurant.id} {...restaurant} />
        </div>
      ))}
    </div>
  );
};

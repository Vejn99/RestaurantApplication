import React from "react";
import { useRestaurantContext } from "../../context/RestaurantContext/RestaurantContext";
import { RestaurantCard } from "../RestaurantCard/RestaurantCard";
import "./PopularRestaurants.css";

export const PopularRestaurants = () => {
  const { restaurants, calculateAverageRating } = useRestaurantContext();

  if (!restaurants || restaurants.length === 0) {
    return (
      <h1 className="text-center text-uppercase mb-4">
        No popular restaurants available
      </h1>
    );
  }

  const sortedRestaurants = restaurants.sort((a, b) => {
    const reviewsA = a.reviewsList?.length || 0;
    const reviewsB = b.reviewsList?.length || 0;

    if (reviewsA !== reviewsB) {
      return reviewsB - reviewsA;
    } else {
      const avgRatingA = calculateAverageRating(a.reviewsList);
      const avgRatingB = calculateAverageRating(b.reviewsList);
      return avgRatingB - avgRatingA;
    }
  });

  const topRestaurants = sortedRestaurants.slice(0, 10);

  return (
    <div className="border-bottom py-5">
      <h1 className="text-center text-uppercase mb-4">
        Our most popular restaurants
      </h1>
      <div className="popularContainer mb-4">
        {topRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
      </div>
    </div>
  );
};

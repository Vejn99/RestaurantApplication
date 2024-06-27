import React from "react";
import { useNavigate } from "react-router-dom";
import { useRestaurantContext } from "../../context/RestaurantContext/RestaurantContext";

export const SurpriseRestaurant = () => {
  const navigate = useNavigate();
  const { restaurants } = useRestaurantContext();

  const handleSurpriseClick = () => {
    if (restaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      const randomRestaurantId = restaurants[randomIndex].id;
      navigate(`/restaurants/${randomRestaurantId}`);
    }
  };

  return (
    <div className="text-center border-bottom  py-5">
      <h1 className="mb-4 text-uppercase">Don't know what to eat?</h1>
      <button className="btn btn-success w-100" onClick={handleSurpriseClick}>
        Surprise me!
      </button>
    </div>
  );
};

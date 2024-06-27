import { useEffect, useState } from "react";
import { ContextChild } from "../../interfaces/child-interface";
import { RestaurantContext } from "./RestaurantContext";
import {
  RestaurantCtxInterface,
  RestaurantCtxValue,
  ReviewInterface,
} from "./RestaurantInterface";
import { restaurantsUrl, useApiData } from "./restaurant-service";

export const RestaurantProvider = ({ children }: ContextChild) => {
  const restaurants = useApiData<RestaurantCtxInterface[]>(restaurantsUrl);
  const [favorites, setFavorites] = useState<string[] | null>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : null;
  });

  useEffect(() => {
    if (favorites !== null) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      localStorage.removeItem("favorites");
    }
  }, [favorites]);

  const toggleFavorite = (restaurantId: string) => {
    setFavorites((prevState) => {
      if (!prevState) {
        return [restaurantId];
      }

      const isFavorite = prevState.includes(restaurantId);

      if (isFavorite) {
        return prevState.filter((id) => id !== restaurantId);
      } else {
        return [...prevState, restaurantId];
      }
    });
  };

  const calculateAverageRating = (reviewsList: ReviewInterface[]) => {
    if (!reviewsList || reviewsList.length === 0) {
      return 0;
    }
    const sumOfStars = reviewsList.reduce(
      (total, review) => total + review.stars,
      0
    );
    const averageRating = sumOfStars / reviewsList.length;

    return Number(averageRating.toFixed(1));
  };

  if (restaurants.error) {
    return (
      <div className="text-center mt-3">
        <h2 className="text-danger">Error: {restaurants.error}</h2>
      </div>
    );
  }

  if (!restaurants.data) {
    return (
      <div className="text-center mt-3">
        <h2 className="text-dark">No data available</h2>
      </div>
    );
  }

  const restaurantValue: RestaurantCtxValue = {
    restaurants: restaurants.data,
    loading: restaurants.loading,
    error: restaurants.error,
    calculateAverageRating,
    favorites,
    toggleFavorite,
  };

  return (
    <RestaurantContext.Provider value={restaurantValue}>
      {children}
    </RestaurantContext.Provider>
  );
};

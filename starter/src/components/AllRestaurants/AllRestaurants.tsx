import { useRestaurantContext } from "../../context/RestaurantContext/RestaurantContext";
import { RestaurantCtxInterface } from "../../context/RestaurantContext/RestaurantInterface";
import { RestaurantCard } from "../RestaurantCard/RestaurantCard";
import "./AllRestaurants.css";

export const AllRestaurants = () => {
  const { restaurants } = useRestaurantContext();

  const renderRestaurants = () => {
    return restaurants.map((restaurant: RestaurantCtxInterface) => {
      return (
        <div className="m-2" key={restaurant.id}>
          <RestaurantCard {...restaurant} />
        </div>
      );
    });
  };
  return (
    <div className="py-5">
      <h1 className="text-center text-uppercase mb-4">All restaurants</h1>
      <div className="resContainer ">{restaurants && renderRestaurants()}</div>
    </div>
  );
};

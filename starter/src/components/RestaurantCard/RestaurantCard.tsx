import { Link, useLocation } from "react-router-dom";
import { RestaurantCtxInterface } from "../../context/RestaurantContext/RestaurantInterface";
import { useRestaurantContext } from "../../context/RestaurantContext/RestaurantContext";
import "./RestaurantCard.css";

export const RestaurantCard = (props: RestaurantCtxInterface) => {
  const { calculateAverageRating, toggleFavorite, favorites } =
    useRestaurantContext();
  const location = useLocation();

  const isFavorite = favorites?.includes(props.id);
  const hasReviews = props.reviewsList && props.reviewsList.length > 0;

  const cardContent = (
    <div className="cardInner">
      <img src={props.image} alt={props.businessname} />
      <div className="cardContain p-2 ">
        <h5>{props.businessname}</h5>
        <p>{props.restauranttype}</p>
        {hasReviews && (
          <span>
            rating - {calculateAverageRating(props.reviewsList)},<br />
            based on {props.reviews} reviews
          </span>
        )}
      </div>
    </div>
  );

  const isHomePage = location.pathname === "/";

  return (
    <div className="card">
      <i
        className={
          isFavorite ? "fa-solid fa-heart fa-2xl" : "fa-regular fa-heart fa-2xl"
        }
        aria-hidden="true"
        onClick={() => toggleFavorite(props.id)}
      ></i>

      {(isHomePage && isFavorite) || (isHomePage && !isFavorite) ? (
        <Link to={`restaurants/${props.id}`}>{cardContent}</Link>
      ) : (
        <div>{cardContent}</div>
      )}
    </div>
  );
};

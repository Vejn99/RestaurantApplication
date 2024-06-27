import { useParams } from "react-router-dom";
import { useRestaurantContext } from "../../context/RestaurantContext/RestaurantContext";
import "./RestaurantDetail.css";
import { useState } from "react";
import { ReviewInterface } from "../../context/RestaurantContext/RestaurantInterface";
import { restaurantsUrl } from "../../context/RestaurantContext/restaurant-service";

export const RestaurantDetail = () => {
  const { id } = useParams();
  const { restaurants, calculateAverageRating } = useRestaurantContext();
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [newReview, setNewReview] = useState<ReviewInterface | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setError] = useState<string>("");

  const currentRestaurant = restaurants.find((el) => el.id === id);

  const hasReviews =
    currentRestaurant?.reviewsList && currentRestaurant?.reviewsList.length > 0;

  const toggleBtn = () => {
    setButtonDisabled(!(name && comment && stars));
  };
  const onSubmitHandler = (event: any) => {
    event.preventDefault();

    if (!currentRestaurant) {
      console.error("Current restaurant is undefined");
      return;
    }

    const reviewObj: ReviewInterface = {
      id: Math.floor(Math.random() * 1000),
      author: name,
      comment: comment,
      stars: stars,
    };

    setName("");
    setComment("");
    setStars(0);
    toggleBtn();
    setIsLoading(true);

    const updatedRestaurant = {
      ...currentRestaurant,
      reviews: currentRestaurant.reviews + 1,
      reviewsList: [...currentRestaurant.reviewsList, reviewObj],
    };

    fetch(`${restaurantsUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRestaurant),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update restaurant");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Restaurant updated successfully:", data);
        setNewReview(reviewObj);
      })
      .catch((error) => {
        console.error("Error updating restaurant:", error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && (
        <div className="text-center mt-3">
          <h2>Loading...</h2>
        </div>
      )}
      {err && (
        <div className="text-center mt-3">
          <h2 className="text-danger">Error: {err}</h2>
        </div>
      )}
      {currentRestaurant && (
        <>
          <h1 className="text-uppercase text-center my-4 m-0">
            {currentRestaurant.businessname}
          </h1>
          <div className="cardDetail">
            <img
              src={currentRestaurant.image}
              alt={currentRestaurant.businessname}
            />
            <div className="card-inner">
              {hasReviews && (
                <small>
                  rating -
                  {calculateAverageRating(currentRestaurant.reviewsList)},
                  <br />
                  based on {currentRestaurant.reviews} reviews
                </small>
              )}
              <span>{currentRestaurant.phone}</span>
              <p>{currentRestaurant.email}</p>
              <p>{currentRestaurant.address}</p>

              <p className="m-0">
                {currentRestaurant.parkinglot
                  ? "We have a parking lot waiting for you"
                  : "We dont have a parking lot"}
              </p>
            </div>
          </div>

          <h1 className="text-uppercase text-center my-4 m-0">Reviews</h1>

          {hasReviews &&
            currentRestaurant.reviewsList.map((review: ReviewInterface) => (
              <div key={review.id} className="review">
                <p>
                  Author: <span>{review.author}</span>
                </p>
                <p>
                  Message: <span>{review.comment}</span>
                </p>
                <p>
                  Stars: <span>{review.stars}</span>
                </p>
              </div>
            ))}

          {newReview && (
            <div key={newReview.id} className="review">
              <p>
                Author: <span>{newReview.author}</span>
              </p>
              <p>
                Message: <span>{newReview.comment}</span>
              </p>
              <p>
                Stars: <span>{newReview.stars}</span>
              </p>
            </div>
          )}

          <h1 className="text-uppercase text-center my-4 m-0">Review form</h1>

          <form className="my-4" onSubmit={onSubmitHandler}>
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              name="userName"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                toggleBtn();
              }}
            />
            <br />
            <label htmlFor="Comment" className="form-label">
              Comment
            </label>

            <textarea
              className="form-control"
              name="lastName"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                toggleBtn();
              }}
            ></textarea>
            <br />
            <label htmlFor="customRange1" className="form-label">
              Stars
            </label>
            <input
              className="form-range"
              type="range"
              min="0"
              max="5"
              step="1"
              name="stars"
              value={stars}
              onChange={(e) => {
                setStars(parseInt(e.target.value));
                toggleBtn();
              }}
            />

            <br />
            <button className="btn btn-success w-100" disabled={buttonDisabled}>
              Leave a review
            </button>
          </form>
        </>
      )}
    </>
  );
};

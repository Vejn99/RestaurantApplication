export interface ReviewInterface {
  id: number;
  author: string;
  comment: string;
  stars: number;
}

export interface RestaurantCtxInterface {
  id: string;
  reviews: number;
  parkinglot: boolean;
  phone: string;
  image: string;
  restauranttype: string;
  businessname: string;
  address: string;
  slug: string;
  email: string;
  isFavorite: boolean;
  reviewsList: ReviewInterface[];
}

export interface RestaurantCtxValue {
  restaurants: RestaurantCtxInterface[];
  loading: boolean;
  error: string | null;
  calculateAverageRating: (reviewsStars: ReviewInterface[]) => number;
  favorites: string[] | null;
  toggleFavorite: (restaurantId: string) => void;
}

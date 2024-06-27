import { createContext, useContext } from "react";
import { RestaurantCtxValue } from "./RestaurantInterface";

export const RestaurantContext = createContext({} as RestaurantCtxValue);

export const useRestaurantContext = () => useContext(RestaurantContext);

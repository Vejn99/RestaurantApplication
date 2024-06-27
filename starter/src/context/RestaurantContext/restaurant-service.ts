import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReviewInterface } from "./RestaurantInterface";

export const restaurantsUrl = "http://localhost:5001/restaurants";

export const useApiData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<T> = await axios.get(url);

      if (response.status === 200) {
        setData(response.data);
      } else {
        setError(`Request failed with status ${response.status}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [url]);

  return { data, loading, error };
};

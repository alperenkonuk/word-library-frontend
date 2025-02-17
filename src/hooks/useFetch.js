import {useEffect, useState} from "react";

const useFetch = (endpoint, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl + endpoint, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, options]);

  return {data, error, loading};
}

export default useFetch;
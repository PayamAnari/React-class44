// useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          throw new Error(
            'Oops! Something went wrong. Please try again later.',
          );
        }
      } catch (error) {
        setError(
          'Oops! Unable to fetch data. Please check your internet connection and try again.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

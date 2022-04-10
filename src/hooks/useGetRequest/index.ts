// https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript

import { useEffect, useState } from 'react';

export default function useGetRequest(url: string) {
  const [data, setData] = useState<{} | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);

  const getRequest = async () => {
    try {
      setLoading(true);
      const response: Response = await fetch(url);
      if(response) {
        setData(response);
      }
    } catch(err) {
      setError(error);
    } finally {
      setLoading(true);
    }
  }

  useEffect(() => {
    getRequest();
  }, [url]);

  return { data, loading, error };
}

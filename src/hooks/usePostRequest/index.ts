// https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript

import { useState } from 'react';

interface PostData {
  [key: string]: any
}

export default function usePostRequest(url: string, postData: PostData) {
  const [data, setData] = useState<{} | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);

  const postRequest = async() => {
    try {
      setLoading(true);
      const response: Response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });

      if(response) {
        setData(response);
      }

    } catch(err: unknown) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return {data, loading, error, postRequest};
}

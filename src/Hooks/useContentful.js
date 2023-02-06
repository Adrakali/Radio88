import { createClient } from "contentful";
import { useState, useEffect } from "react";

export default function useContentful() {
  const { REACT_APP_SPACE_ID, REACT_APP_CDA_TOKEN } = process.env;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const client = createClient({
    space: REACT_APP_SPACE_ID,
    accessToken: REACT_APP_CDA_TOKEN,
  });

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        await client.getEntries().then((entries) => {
          setData(entries.items);
          setIsLoading(false);
          setError(null);
        });
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
    getAllEntries();
  }, [client]);

  return { data, isLoading, error };
}

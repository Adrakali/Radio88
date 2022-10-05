import { createClient } from "contentful";
import { useState, useEffect } from "react";

export default function useContentful() {
  // const { REACT_APP_SPACE_ID, REACT_APP_CDA_TOKEN } = process.env;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const client = createClient({
    space: "c1fpveiwcp1f",
    accessToken: "jOkZsPj4FYnrVc6pQKMN614xU0Co-GEiipCj5-4TXBk",
  });

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        await client.getEntries().then((entries) => {
          setData(entries.items);
          setLoading(false);
          setError(null);
        });
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    getAllEntries();
  }, []);

  return { data, loading, error };
}

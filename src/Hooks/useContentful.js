import { createClient } from "contentful";
import { useQuery } from "react-query";

export default function useContentful() {
  const { REACT_APP_SPACE_ID, REACT_APP_CDA_TOKEN } = process.env;

  const client = createClient({
    space: REACT_APP_SPACE_ID,
    accessToken: REACT_APP_CDA_TOKEN,
  });

  const getAllEntries = async () => {
    const entries = await client.getEntries();
    return entries.items;
  };

  const { data, isLoading, isError } = useQuery(
    "contentfulData",
    getAllEntries
  );

  return { data, isLoading, isError };
}

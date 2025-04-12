import { useQuery } from "react-query";

export default function useFacebook() {
  const { REACT_APP_FACEBOOK_TOKEN } = process.env;

  const getFacebookData = async () => {
    const response = await fetch(
      `https://graph.facebook.com/me?fields=posts{from,full_picture,message,permalink_url,created_time,id}&access_token=${REACT_APP_FACEBOOK_TOKEN}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from Facebook API");
    }
    const data = await response.json();
    return data.posts.data;
  };

  const { data, isLoading, isError } = useQuery(
    "facebookData",
    getFacebookData,
    {
      enabled: !!REACT_APP_FACEBOOK_TOKEN,
    }
  );

  return { data, isLoading, isError };
}

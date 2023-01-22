import { useState, useEffect } from "react";

export default function useFacebook() {
  const { REACT_APP_FACEBOOK_TOKEN } = process.env;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://graph.facebook.com/me?fields=posts{from,full_picture,message,permalink_url,created_time,id}&access_token=${REACT_APP_FACEBOOK_TOKEN}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.posts.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { data, isLoading, error };
}

// radio88 facebook page id: 100064241733780, (radio88.se)

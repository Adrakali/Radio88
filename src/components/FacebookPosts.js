import React, { useState } from "react";
import useFacebook from "../Hooks/useFacebook";
import FacebookCard from "./FacebookCard";

function FacebookPosts() {
  const { data, isLoading, error } = useFacebook();
  const [visibleCards, setVisibleCards] = useState(5);
  function loadMore() {
    setVisibleCards((prev) => prev + 5);
  }

  //sortera data efter datum
  data?.sort((a, b) => {
    return new Date(b.created_time) - new Date(a.created_time);
  });

  return (
    <section>
      <div className="container">
        <div className="grid gap-8">
          {error && <p>{error}</p>}
          {isLoading && <p>Laddar...</p>}
          {data &&
            data
              .slice(0, visibleCards)
              .map((post) => (
                <FacebookCard
                  key={post.id}
                  from={post.from.name}
                  message={post.message}
                  image={post.full_picture}
                  link={post.permalink_url}
                  created={post.created_time}
                />
              ))}
          {data && visibleCards < data.length && (
            <button className="btn" onClick={loadMore}>
              Ladda fler
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default FacebookPosts;

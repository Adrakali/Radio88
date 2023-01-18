import React from "react";
import useFacebook from "../Hooks/useFacebook";
import FacebookCard from "./FacebookCard";

function FacebookPosts() {
  const { data, isLoading, error } = useFacebook();

  //sortera data efter datum
  data?.sort((a, b) => {
    return new Date(b.created_time) - new Date(a.created_time);
  });

  return (
    <section>
      <div className="container">
        <div>
          {error && <p>{error}</p>}
          {isLoading && <p>Laddar</p>}
          {data &&
            data.map((post) => (
              <FacebookCard
                key={post.id}
                from={post.from.name}
                message={post.message}
                image={post.full_picture}
                link={post.permalink_url}
                created={post.created_time}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default FacebookPosts;

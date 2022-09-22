import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useContentful from "./Hooks/useContentful";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useContentful();
  console.log(data);
  return (
    <section>
      <div className='container'>
        <p
          className='pointer'
          onClick={() => {
            navigate("/program");
          }}
        >
          Tillbaka
        </p>
        {loading && <div>Laddar sidan...</div>}
        {error && <div>{error}</div>}
        {/* {data && (
          <article>
            {id}
            <h1>{data.fields.title}</h1>
            <p>{data.fields.description}</p>
            <img
              src={data.fields.image.fields.file.url}
              alt={`${data.fields.title} programbild`}
            />
          </article>
        )} */}
      </div>
    </section>
  );
}

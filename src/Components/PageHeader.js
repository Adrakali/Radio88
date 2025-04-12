import React from "react";

function PageHeader({ title, width, info }) {
  return (
    <section className="hero relative overflow-hidden text-primary lg:py-20">
      <img
        alt="hero background"
        src="images/mick-haupt-FGrGhzaSl0s-unsplash.jpg"
        className="absolute inset-0 -z-20 object-cover"
      />
      <div className="hero-overlay absolute inset-0 -z-10 bg-[#790027] opacity-95"></div>
      <div
        className={`max-w-[1380px] align-center mx-auto flex justify-between`}>
        <h1 className="my-0 self-center">{title}</h1>
        <p className="max-w-2xl self-center py-0 text-left text-p text-white">
          {info}
        </p>
      </div>
    </section>
  );
}

export default PageHeader;

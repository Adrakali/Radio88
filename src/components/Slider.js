import React, { useState, useEffect } from "react";

const Slider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 8000);
    return () => clearInterval(intervalId);
  }, [currentImageIndex, images.length]);

  return (
    <div className="mb-4 max-h-[335px] w-full overflow-hidden sm:mb-8">
      <img
        src={`./images/slider/${images[currentImageIndex]}`}
        alt="Slider"
        className="object-cover object-center"
      />
    </div>
  );
};

export default Slider;

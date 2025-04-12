import React from "react";

function Hero({
  isLoading,
  error,
  isLive,
  isCancelled,
  data,
  filterCurrentShow,
  isPlaying,
  playRadio,
}) {
  return (
    <div>
      <section className="hero relative flex items-center justify-center overflow-hidden py-10 md:py-20 lg:py-20">
        <img
          alt="hero background"
          src="images/mick-haupt-FGrGhzaSl0s-unsplash.jpg"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="hero-overlay absolute inset-0 -z-10 bg-[#790027] opacity-95"></div>
        <div>
          <div className="hero__left flex flex-col items-center justify-center text-white">
            {isLoading && <div>Laddar...</div>}
            {error && <div>Error: {error.message}</div>}
            {isLive && !isCancelled ? (
              data &&
              filterCurrentShow().map((show) => {
                return (
                  <div key={show.sys.id}>
                    <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:gap-24">
                      <div className="order-2 lg:text-left">
                        <p className="mb-2 font-bold text-primary md:mb-4 md:text-2xl">
                          Just nu på Radio 88
                        </p>
                        <h1 className="mt-0 mb-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                          {show.fields.title}
                        </h1>
                        {!isPlaying && (
                          <div>
                            <button
                              onClick={playRadio}
                              className="rounded-full bg-primary px-16 py-4 font-body font-extrabold uppercase text-black mt-4 md:mt-4 lg:mt-8 ">
                              <i className="fa-solid fa-play mr-4"></i>Lyssna nu
                            </button>
                          </div>
                        )}
                      </div>
                      {show.fields.image && (
                        <div className="w-1/2 sm:shadow-md lg:w-[450px]">
                          <img
                            className="w-full"
                            src={show.fields.image.fields.file.url}
                            alt={show.fields.title}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-primary">
                <h1 className="my-0 max-w-[27ch]">
                  Vi spelar musiken som du glömt att du kommer ihåg
                </h1>
                {!isPlaying && (
                  <div>
                    <button
                      onClick={playRadio}
                      className="mt-8 rounded-full bg-primary px-16 py-4 font-body font-extrabold uppercase text-black md:mt-12 lg:mt-16 ">
                      <i className="fa-solid fa-play mr-4"></i>Lyssna nu
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;

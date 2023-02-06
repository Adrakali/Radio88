import React from "react";

function CancelBanner({ filterCurrentShow, isCancelled }) {
  return (
    <div>
      {filterCurrentShow() && isCancelled && filterCurrentShow()[0] && (
        <section className="border-b-[3px] border-black bg-red-300">
          <div className="container flex max-w-[1380px] items-center px-2 py-2">
            <i class="fa-sharp fa-solid fa-circle-exclamation mr-2"></i>
            <p className="pb-0 font-bold">
              {filterCurrentShow()[0].fields.title} är inställd idag
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default CancelBanner;

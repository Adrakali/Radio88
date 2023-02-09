import React from "react";
import PageHeader from "../Components/PageHeader";

function Ads() {
  return (
    <div>
      <PageHeader title={"Annonsera"} width={"1380px"} />
      <section>
        <div class="max-w-[1380px] mx-auto">
          <h2 className="mb-8">Visa upp er hos oss</h2>
          <div className="gap-24 lg:flex">
            <div>
              <div>
                <p className="mb-8">
                  Annonsering i radio är snabbt och kostnadseffektivt. Mediet är
                  lättillgängligt och lyssnarna ges på ett lättsamt sätt
                  tillsammans med musiken flera positiva intryck av
                  annonsörernas erbjudanden. Tag gärna kontakt med oss så
                  berättar vi vidare om reklaminslagen i Radio 88.
                </p>
                <p className="mb-8 lg:mb-0">
                  Enligt Sifo har Radio 88 drygt 30.000 lyssnare och 90% av
                  dessa är över 35 år. Om du är ny som annonsör, så kostar
                  annonsering på årsbasis från 1.500:-/mån till 5.900:-/mån,
                  beroende på hur mycket tid du köper totalt. Med det så är vi i
                  särklass det mest prisvänliga annonsmediet i Göteborgsområdet.
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex w-full basis-auto flex-col flex-nowrap gap-4 bg-primary p-4 md:p-8 lg:gap-10">
                <div className="flex items-center">
                  <i class="fa-solid fa-circle-check mr-4 text-h5 text-accent"></i>
                  <p className="mb-0 font-body text-h5 leading-8 tracking-tight">
                    <span className="font-bold">30.000</span> lyssnare
                  </p>
                </div>
                <div className="flex items-center">
                  <i class="fa-solid fa-circle-check mr-4 text-h5 text-accent"></i>
                  <p className="mb-0 font-body text-h5 leading-8 tracking-tight">
                    <span className="font-bold">90%</span> över 35 år
                  </p>
                </div>
                <div className="flex items-center">
                  <i class="fa-solid fa-circle-check mr-4 text-h5 text-accent"></i>
                  <p className="mb-0 font-body text-h5 leading-8 tracking-tight">
                    Från <span className="font-bold">1.500:-</span>/mån
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primary-300 py-10 px-4 lg:py-20">
        <div className="max-w-[1380px] mx-auto">
          <h2 className="mb-4 sm:mb-8">Reklamansvarig</h2>
          <div className="gap-8 sm:flex">
            <div className="mb-4 sm:max-w-[350px]">
              <img src="images/christer.png" alt="Christer Lindstedt" />
            </div>
            <div>
              <p className="mb-4 font-sans text-h4">Christer Lindstedt</p>
              <div className="mb-4">
                <div className="flex items-center text-accent">
                  <i className="fa-sharp fa-solid fa-phone mr-4"></i>
                  <p className="mb-0 text-lg font-semibold uppercase">
                    Telefon
                  </p>
                </div>
                <a href="tel:+1234567890">
                  <p className="mb-0 font-bold tracking-tight">
                    0700 — 200 100
                  </p>
                </a>
              </div>
              <div>
                <div className="flex items-center text-accent">
                  <i className="fa-sharp fa-solid fa-envelope mr-4"></i>
                  <p className="mb-0 text-lg font-semibold uppercase">E-mail</p>
                </div>
                <a href="mailto:sales@radio88.se">
                  <p className="mb-0 font-bold tracking-tight">
                    sales@radio88.se
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ads;

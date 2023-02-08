import React from "react";
import PageHeader from "../Components/PageHeader";

function Ads() {
  return (
    <div>
      <PageHeader title={"Annonsera"} width={"1380px"} />
      <section className="container max-w-[1380px] px-4 py-10 lg:py-20">
        <div>
          <h2 className="mb-8">Visa upp er hos oss</h2>
          <div className="gap-8 lg:flex">
            <div>
              <div>
                <p className="mb-8">
                  Annonsering i radio är snabbt och kostnadseffektivt. Mediet är
                  lättillgängligt och lyssnarna ges på ett lättsamt sätt
                  tillsammans med musiken flera positiva intryck av
                  annonsörernas erbjudanden. Tag gärna kontakt med oss så
                  berättar vi vidare om reklaminslagen i Radio 88.
                </p>
                <p className="mb-16">
                  Enligt Sifo har Radio 88 drygt 30.000 lyssnare och 90% av
                  dessa är över 35 år. Om du är ny som annonsör, så kostar
                  annonsering på årsbasis från 1.500:-/mån till 5.900:-/mån,
                  beroende på hur mycket tid du köper totalt. Med det så är vi i
                  särklass det mest prisvänliga annonsmediet i Göteborgsområdet.
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex w-full basis-auto flex-col flex-nowrap lg:gap-10 gap-4 bg-primary p-4 md:p-8">
                <div className="flex items-center">
                  <i class="fa-solid fa-circle-check mr-4 text-h5 text-accent"></i>
                  <p className="font-body text-h5 font-extrabold tracking-tight">
                    30.000 lyssnare
                  </p>
                </div>
                <div className="flex items-center">
                  <i class="fa-solid fa-circle-check mr-4 text-h5 text-accent"></i>
                  <p className="font-body text-h5 font-extrabold tracking-tight">
                    90% över 35 år
                  </p>
                </div>
                <div className="flex items-center">
                  <i class="fa-solid fa-circle-check mr-4 text-h5 text-accent"></i>
                  <p className="font-body text-h5 font-extrabold tracking-tight">
                    Från 1.500:-/mån
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primary-300 lg:py-20 py-10 px-4">
        <div className="container max-w-[1380px]">
          <h2 className="sm:mb-8 mb-4">Reklamansvarig</h2>
          <div className="sm:flex gap-8">
            <div className="sm:max-w-[350px] mb-4">
              <img src="images/christer.png" alt="Christer Lindstedt" />
            </div>
            <div>
              <p className="mb-4 font-sans text-h4">Christer Lindstedt</p>
              <div className="mb-4">
                <div className="flex items-center text-accent">
                  <i className="fa-sharp fa-solid fa-phone mr-4"></i>
                  <p className="text-lg font-semibold uppercase">Telefon</p>
                </div>
                <p className="font-bold tracking-tight">0700 — 200 100</p>
              </div>
              <div>
                <div className="flex items-center text-accent">
                  <i className="fa-sharp fa-solid fa-envelope mr-4"></i>
                  <p className="text-lg font-semibold uppercase">E-mail</p>
                </div>
                <p className="font-bold tracking-tight">sales@radio88.se</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ads;

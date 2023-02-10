import React from "react";
import PageHeader from "../Components/PageHeader";

function Support() {
  return (
    <main>
      <PageHeader title={"Supporterklubben"} width={"1380px"} />
      <section>
        <div className="mx-auto max-w-[1380px] items-center gap-16 lg:flex">
          <div>
            <h2 className="mb-8 max-w-2xl">
              Visst vill du att den här radiokanalen ska fortsätta spela musiken
              som du gillar!
            </h2>
            <p className="mb-8">
              Musikkanalen Radio 88 är en ideell förening som drivs av ett
              30-tal kunniga och engagerade programledare. Vi vill bli ännu
              bättre och nå ännu fler lyssnare – och nu kan du hjälpa till! Bli
              supporter och stöd Radio 88, så kanalen kan leva vidare och
              utvecklas.
            </p>
            <p className="mb-8">
              Supporteravgiften är 300 kr om året. När du blir supporter får du
              en Radio 88-tröja, dessutom är du med i månadsvisa utlottningar av
              biobiljetter. Fyra gånger om året kommer FansIn88 hem i din
              ”brevlåda”. Alla supportrar inbjuds också till trevliga träffar
              ett par gånger om året.
            </p>
          </div>
          <div className="w-full">
            <img
              src="images/gruppbild.png"
              alt="Gruppbild på några programledare"
            />
          </div>
        </div>
      </section>
      <section className="bg-primary-300">
        <div className="mx-auto flex max-w-[1380px] flex-col items-center gap-8 lg:flex-row lg:gap-24">
          <div className="order-2 mb-4 lg:max-w-[550px]">
            <img src="images/t-shirt.png" alt="Radio 88 t-shirt" />
          </div>
          <div className="lg:order-2">
            <h2 className="mb-4 sm:mb-8">Så blir du en Radio 88 supporter</h2>
            <ul className="max-w-4xl list-disc pl-4 font-body text-p">
              <li className="mb-8">
                Betala in 300 kr på bankgiro 868 – 8673, skriv ditt namn,
                adress, mail och tröjstorlek på inbetalningen.
              </li>
              <li className="mb-8">
                Maila ditt namn och din adress till medlem@radio88.se, så
                skickar vi ett inbetalningskort.
              </li>
              <li className="mb-8">
                Swish till 1234 354 908. Skriv namn, adress, mail, tröjstorlek
                under meddelande. Eller maila uppgifterna till medlem@radio88.se
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Support;

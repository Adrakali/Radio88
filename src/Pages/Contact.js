import React, { useState } from "react";
import PageHeader from "../Components/PageHeader";

export default function Contact() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMail("");
    setName("");
    setSubject("");
    setMessage("");
    const formData = { name, mail, subject, message };

    fetch("localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        console.log("success");
        setIsLoading(false);
        formData.reset();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <main>
      <PageHeader width={"1380px"} title={"Kontakt"} />

      <div className="align-center mx-auto flex max-w-[1380px] lg:py-20 lg:px-0 px-8 py-8 flex-col lg:gap-24 gap-16 lg:flex-row">
        <section className="flex-grow p-0">
          <h2 className="mb-4">Kontaktformulär</h2>
          <p className="mb-10 max-w-[50ch]">
            Vi vill gärna veta vad du tycker om Radio 88. Skriv gärna några
            rader om du har förslag eller synpunkter på något vi kan göra bättre
            eller annorlunda.
          </p>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="tracking-thight block font-body text-lg font-bold uppercase">
                Namn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 w-full border p-4 font-body text-2xl font-medium"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="tracking-thight block font-body text-lg font-bold uppercase">
                E-Mail
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="h-12 w-full border p-4 font-body text-2xl font-medium"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="tracking-thight block font-body text-lg font-bold uppercase">
                Ämne
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-12 w-full border p-4 font-body text-2xl font-medium"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="tracking-thight block font-body text-lg font-bold uppercase">
                Meddelande
              </label>
              <textarea
                required
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-40 w-full border p-4 font-body"
              />
            </div>
            {!isLoading ? (
              <button
                type="submit"
                className="btn font-body font-bold uppercase">
                Skicka meddelande
              </button>
            ) : (
              <p>Skickar ditt meddelande...</p>
            )}
          </form>
        </section>

        <section className="flex-grow bg-primary p-8">
          <h2 className="mb-8">Kontaktuppgifter</h2>
          <div className="mb-8">
            <div className="flex items-center text-accent">
              <i className="fa-sharp fa-solid fa-envelope mr-4"></i>
              <p className="text-lg font-semibold uppercase">E-mail</p>
            </div>
            <a href="mailto:info@radio88.se">
              <p className="font-bold tracking-tight">info@radio88.se</p>
            </a>
          </div>
          <div className="mb-8">
            <div className="flex items-center text-accent">
              <i className="fa-sharp fa-solid fa-phone mr-4"></i>
              <p className="text-lg font-semibold uppercase">Telefon</p>
            </div>
            <a href="tel:+4631261090">
              <p className="font-bold tracking-tight">031-26 10 90</p>
            </a>
          </div>
          <div className="mb-8">
            <div className="flex items-center text-accent">
              <i className="fa-sharp fa-solid fa-house mr-4"></i>
              <p className="text-lg font-semibold uppercase">Adress</p>
            </div>
            <p className="mb-8 font-bold tracking-tight">
              Göteborgsvägen 68,
              <br /> 433 63 Sävedalen
            </p>
            <p className="mb-4">
              <span className="block text-lg font-semibold uppercase text-accent">
                Telefontider:
              </span>
              Vi svarar när vi är på plats.
            </p>
            <p>
              Vid störningar/avbrott i våra sändningar
              <br /> SMS:a telefonnummer:
              <span className="font-bold"> 076-58 88 184</span>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

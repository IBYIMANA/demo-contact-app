import React, { useState, useEffect } from "react"
import { FetchContacts } from "../apis/contacts"
import Contact from "../components/Contact";

const Home = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    FetchContacts()
      .then((response) => {
        setContacts(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Add a loading state
  

  return (
    <div className="flex items-center justify-center w-full bg-gray-900">
      <section className="text-white bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold sm:text-4xl">My contacts</h2>

            <p className="mt-4 text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores iure fugit totam
              iste obcaecati. Consequatur ipsa quod ipsum sequi culpa delectus, cumque id tenetur
              quibusdam, quos fuga minima.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
            {/* Add a null check for contacts before mapping */}
            {contacts && contacts.map((contact) => (
              <Contact key={contact._id} contact={contact} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
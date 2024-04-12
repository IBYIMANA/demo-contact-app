import { useState } from "react"
import ResponseMessage from "../components/ResponseMessage";
import { AddContact } from "../apis/contacts";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [message, setMessage] = useState({
    type: '',
    content: ''
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({
    fullName: '',
    phone: '',
    email: ''
  });

  // const [fullName, setFullName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');

  const handleSubmitContact = (event) => {
    event.preventDefault();

    if (contact.fullName === '') {
      setMessage({
        type: 'error',
        content: 'Full Name is required'
      });
      return;
    } else if (contact.email === '') {
      setMessage({
        type: 'error',
        content: 'Email is required'
      });
      return;
    } else if (contact.phone === '') {
      setMessage({
        type: 'error',
        content: 'Phone is required'
      });
      return;
    } else {
      setLoading(true);

      AddContact(contact)
        .then(response => {
          setLoading(false);
          setMessage({
            type: 'success',
            content: response
          });

          setContact({
            fullName: '',
            phone: '',
            email: ''
          });

          setTimeout(() => {
            // Using react-router-dom
            navigate('/');
            
          },2000)
        })
        .catch((error) => {
          setMessage({
            type: 'error',
            content: error
          })
        })
    }
  };

  // const handleFullName = (event) => {
  //   setFullName(event.target.value);
  // }
  // const handlePhone = (event) => {
  //   setPhone(event.target.value);
  // }
  // const handleEmail = (event) => {
  //   setEmail(event.target.value);
  // }

  const handleInput = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  return (
    <div className="flex items-center justify-center w-full">
      <section className="flex items-center justify-center w-full text-black ">
        <div className="max-w-screen-xl">
          <div className="grid grid-cols-1 gap-8">
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
              <div className="max-w-lg mx-auto text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Add new contact</h1>
                <p className="mt-4 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
                  ipsa culpa autem, at itaque nostrum!
                </p>
              </div>


              {/* Contact form ==========================================================================  */}
              <form onSubmit={handleSubmitContact} className="max-w-md mx-auto mt-8 mb-8 space-y-4">
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={contact.fullName}
                      onChange={handleInput}
                      className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={contact.email}
                      onChange={handleInput}
                      className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={contact.phone}
                      onChange={handleInput}
                      className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-block px-5 py-3 text-sm font-medium text-white rounded-lg bg-lime-500">
                    {loading && "loading...🐥"}
                    {!loading && "Add contact"}
                  </button>
                </div>
              </form>

              <ResponseMessage type={message.type} content={message.content} />
              {/* ==========================================================================  */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Add
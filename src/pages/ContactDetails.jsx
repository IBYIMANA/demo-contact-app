import { useEffect, useState } from "react"
import { DeleteContact, FetchContactById } from "../apis/contacts";
import { useParams, useNavigate } from 'react-router-dom';

const ContactDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({});
  const [message, setMessage] = useState({
    type: '',
    content: ''
  });

  useEffect(() => {
    FetchContactById(params.contactId)
     .then((response) => {
        setContact(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteContact = (event) => {
    event.preventDefault();

    DeleteContact(params.contactId)
     .then((response) => {
        setMessage({
          type:'success',
          content: response
        });
        
        setTimeout(() => {
          // Vanilla JavaScript, it reloads the website
          window.location.replace('/');
          // Using react-router-dom
          // navigate('/');
          
        },2000)
      })
     .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container flex items-center justify-center w-full max-w-screen-xl gap-20 p-4 px-4 py-8 mx-auto text-center bg-gray-300 border border-gray-100 rounded-lg shadow-lg sm:px-6 sm:py-12 lg:px-8">
      <div className="float-left ml-2">
      <h1>Name: {contact.fullName}</h1>
      <p>Phone: {contact.phone}</p>
      <p>Email: {contact.email}</p>
      </div>
      <div className="flex float-right gap-6 mt-4 sm:mt-0 sm:flex-row sm:items-center">
      <button onClick={() => navigate(`/update/${contact._id}`)} className= "block px-5 py-3 text-sm font-medium text-black transition rounded-lg bg-lime-400 hover:bg-gray-200 focus:outline-none focus:ring">Update</button>
           
      <button className="block px-5 py-3 text-sm font-medium text-black transition rounded-lg bg-lime-400 hover:bg-gray-200 focus:outline-none focus:ring" onClick={deleteContact} type="button">Delete</button>   
              
            
          </div>
          

      {message.type === 'success' && <p className="px-3 py-2 text-green-700 bg-green-200 rounded-sm">{message.content}</p>}
      {message.type === 'error' && <p className="px-3 py-2 text-red-700 bg-red-200 rounded-sm">{message.content}</p>}

    </div>
  )
}

export default ContactDetails
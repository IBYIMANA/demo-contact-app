import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const params = useParams();
  const navigate = useNavigate();
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [contact, setContact] = useState({});

  // Fetch data
  useEffect(() => {
    axios.get(`https://contact-app-server-nxgi.onrender.com/api/v1/contactapp/contact/findById?id=${params.contactId}`)
      .then(response => {
        setContact(response.data.contact);
      })
      .catch(err => { console.error(err);})
  }, [params.contactId])

  
  const updateContact = (e) => {
    e.preventDefault();

    setError('');
    setMessage('');

    axios.put(`https://contact-app-server-nxgi.onrender.com/api/v1/contactapp/contact/update?id=${params.contactId}`, contact)
    .then(response => {
      if (response.status === 200) {
        setMessage(response.data.message);
        setContact(response.data.contact);
        
        setTimeout(() => {
          setMessage('');
          navigate(`/more/${response.data.contact._id}`);
        }, 3000);
      }
    })
    .catch(err => { 
      setError(err);
      console.error(err);
    })
    
  }

  const handleInputs = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col items-center justify-center w-ful">
      <div className="flex flex-col justify-between w-11/12 py-8 md:max-w-4xl">
        <h1 className="mb-3 text-3xl font-semibold">{contact.fullName}</h1>
        <form onSubmit={updateContact} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName">Full name</label>
            <input 
              type="text" 
              name="fullName" 
              required
              value={contact.fullName || ''} 
              id="fullName" 
              onChange={handleInputs} 
              className="p-3 border border-black rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email" 
              required
              value={contact.email || ''} 
              id="email" 
              onChange={handleInputs} 
              className="p-3 border border-black rounded-lg"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone</label>
            <input 
              type="number" 
              name="phone"
              minLength={10}
              maxLength={10}
              required 
              value={contact.phone || ''} 
              id="phone" 
              onChange={handleInputs} 
              className="p-3 border border-black rounded-lg"
            />
          </div>
          
          <button type="submit" className="px-4 py-3 mt-5 text-base text-black rounded-lg bg-lime-600">Update</button>
          {message && <p className="p-5 text-green-900 bg-green-200 rounded-lg">{message}</p>}
          {error && <p className="p-5 text-red-900 bg-red-200 rounded-lg">{error}</p>}
        </form>
      </div>
    </div>
  )
}

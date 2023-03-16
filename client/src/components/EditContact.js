import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { getContactAsync,editContactAsync } from "../contacts/contactsSlice";
import { useNavigate } from "react-router-dom";
const defaultValue = {
  name: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
};

const EditContact = () => {
  const [contact, setContact] = useState(defaultValue);
  const [error, setError]= useState('');
  const [status, setStatus] = useState("idle");
   const { name, lastName, email, phoneNumber, birthDate } = contact;
 
   const dispatch = useDispatch()
   const navigate = useNavigate()
 
   const handleInputChange= (e)=> {
      let {name, value }= e.target;
      setContact({...contact , [name]: value})
   }
   const {id} = useParams()

   useEffect(()=>{
     loadContactDetail(id)
   },[])

 

   const loadContactDetail=async (id) => {
    const response = await dispatch(getContactAsync(id)) 
   setContact(response.payload)
   }
   
   const handleSubmit = async (e) => {
    e.preventDefault();
 
   if( !name || !lastName || !email  || !phoneNumber || !birthDate) {
      setError('All inputs are required ! ');
    return;
    }
 
   try {
 
      setStatus("loading")
      setError('')
      await dispatch (editContactAsync( id))
      setStatus("fulfilled")
     
      navigate("/")
     
   
    } catch(error) {
      setStatus("rejected")
      setError(error.message);
   }
 
 
    }

  
  return (
    <div>   <nav className="navbar kanit">
    <div className="logo">Contact App</div>
  </nav>
  <br></br>
  <section className="contact">
    <div className="headings">
      <div className="divider">
        <div className="darkline"></div>
        <div>
          <i className="fa fa-star fa-star-dark" aria-hidden="true"></i>
        </div>
        <div className="darkline"></div>
      </div>
    </div>


    {error && <h3>{error}</h3>}
    

    <form onSubmit={handleSubmit} >
      <label htmlFor="name">
        <input type="text" id="name" placeholder="Name" value={name} name='name' onChange={handleInputChange} required />
        <span>Name</span>
      </label>
      <label htmlFor="lastName">
        <input type="text" id="lastName" placeholder="lastName" name='lastName' onChange={handleInputChange} value={lastName} required />
        <span>Last name</span>

      </label>
      <label htmlFor="email">
        <input type="email" id="email" placeholder="Email" onChange={handleInputChange}  value={email} name='email'  required />
        <span>Email addres </span>
      </label>
      <label htmlFor="phoneNumber">
        <input type="text" id="phoneNumber" placeholder="phoneNumber" onChange={handleInputChange} value={birthDate}  name='birthDate' required />
        <span>Birth Date</span>
      </label>
      <label htmlFor="phoneNumber">
        <input type="text" id="phoneNumber" placeholder="phoneNumber" onChange={handleInputChange}  value={phoneNumber}  name='phoneNumber' required />
        <span>phoneNumber number</span>
      </label>
      <button type="submit" disabled={status === "loading"}>Update</button>
    </form>
  </section></div>
  )
}

export default EditContact
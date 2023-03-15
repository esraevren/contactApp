import React, {useState} from 'react'
import { addContact } from '../server/api'


const defaultValue = {
  name: '',
  lastname: '',
  email: '',
  phone : '',
  date: ''
}

const AddContact = () => {
 
 const [contacts, setContacts] = useState(defaultValue)
 const { name, lastname, email, phone, date } = contacts;


 const onValueChange= (e) => {
    console.log(e.target.name + e.target.value)
    setContacts({...contacts, [e.target.name ] : e.target.value})
    console.log(contacts)
 }


 const addContactDetail = async () => {
   await addContact(contacts)
 }

  return (
    <div>
      <nav className="navbar kanit">
        <div className="logo">Contact App</div>
        
      </nav>
      <br></br>
      <section class="contact">
      <div class="headings">
        
        <div class="divider">
          <div class="darkline"></div>
          <div><i class="fa fa-star fa-star-dark" aria-hidden="true"></i></div>
          <div class="darkline"></div>
        </div>
      </div>
      <form>
        <label for="name">
          <input type="text" id="name" placeholder="Name" required />
          <span >Name</span>
        </label>
        <label for="lastname">
          <input type="text" id="lastname" placeholder="lastname" required />
          <span>Last name</span>
        </label>
        <label for="email">
          <input type="email" id="email" placeholder="Email" required />
          <span>Email addres </span>
        </label>
        <label for="phone">
          <input type="text" id="phone" placeholder="Phone" required />
          <span>Birth Date</span>
        </label>
        <label for="phone">
          <input type="text" id="phone" placeholder="Phone" required />
          <span>Phone number</span>
        </label>

       
        <button type="submit">Save</button>
      </form>
    </section>


    </div>
  )
}

export default AddContact
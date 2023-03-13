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


 const onValueChange= (e) => {
    console.log(e.target.name + e.target.value)
    setContacts({...contacts, [e.target.name ] : e.target.value})
    console.log(contacts)
 }


 const addContactDetail = async () => {
   await addContact(contacts)
 }

  return (
    <div>Add Contact
      <br></br>
     <form>
      <label>AD</label>
      <input onChange={(e)=>onValueChange(e)} name='name'/>
      <br></br>
      <label>SOYAD</label>
      <input onChange={(e)=>onValueChange(e)}  name='lastname'/>
      <br></br>
      <label>EMAİL</label>
      <input onChange={(e)=>onValueChange(e)} name='email' />
      <br></br>
      <label>TELEFON</label>
      <input onChange={(e)=>onValueChange(e)} name='phone' />
      <br></br>
      <label>DOĞUM TARİHİ </label>
      <input  onChange={(e)=>onValueChange(e)} name='date'  />
      <br></br>
      <button onClick={()=>addContactDetail()}>SAVE</button>
     </form>


    </div>
  )
}

export default AddContact
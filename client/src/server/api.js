import axios from 'axios'

const URL= 'http://localhost:8000/api/contacts'


export const addContact = async (data) => {
  try{
    return await axios.post(`${URL}/add`, data )
  }catch(error) {
    console.log('Error adding contact'+ error)
  }
}


export const getContacts = async () => {
  try {
    return await axios.get(`${URL}`)
  }catch(error) {
   console.log('Error ', error)
  }
}
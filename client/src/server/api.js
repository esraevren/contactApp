import axios from 'axios'

const URL= ''


export const addContact = async (data) => {
  try{
    return await axios.post(`${URL}/add`, data )
  }catch(error) {
    console.log('Error adding contact'+ error)
  }
}
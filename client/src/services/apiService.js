import axios from "axios";

const fetcher = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const addContactService = (data) => {
  return fetcher.post(`/contacts`, data);
};

export const getContactsService = () => {
  return fetcher.get(`/contacts`);
};

export const getContactByIdService = (contactId) => {
  return fetcher.get(`/contacts/${contactId}`);
};

export const editContactByIdService= ( contactId) => {
  return fetcher.put(`/contacts/${contactId}`);
}

export const deleteContactByIdService = async (contactId) => {
  return fetcher.delete(`/contacts/${contactId}`);
};

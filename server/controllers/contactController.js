const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@route GET /api/contacts
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@route POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
  console.log("req of body", req.body);
  const { name, lastName, email, phoneNumber, birthDate } = req.body;
  if (!name || !lastName || !email || !phoneNumber || !birthDate) {
    res.status(400);
    throw new Error("All fields are required ");
  }

  const contact = await Contact.create({
    name,
    lastName,
    email,
    phoneNumber,
    birthDate,
  });
  res.status(201).json(contact);
});


//@route GET /api/contacts/:id
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});


//@route PUT /api/contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});


//@route DELETE /api/contacts/:id
const deleteContact = asyncHandler (async (req, res) => {
  const id = req.params.id;

  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404).send();
  }

  await Contact.deleteOne({ _id: id });

  res.status(204).send();
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

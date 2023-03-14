const asyncHandler=require('express-async-handler')

//@route GET /api/contacts
const getContacts = asyncHandler (async (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
});
//@route POST /api/contacts
const createContact = asyncHandler (async(req, res) => {
  console.log("req of body", req.body);
  const { name, lastname, email, phone, date } = req.body;
  if( !name || !lastname || !email || !phone || !date){
    res.status(400)
    throw new Error ("All fields are required ")
  }
  res.status(201).json({ message: "Create contact" });
});
//@route GET /api/contacts/:id
const getContact =asyncHandler( async(req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id} ` });
});
//@route PUT /api/contacts/:id
const updateContact =asyncHandler (async(req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id} ` });
});
//@route DELETE /api/contacts/:id
const deleteContact =(async(req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id} ` });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

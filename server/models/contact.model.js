const mongoose= require('mongoose');

var contactSchema = new mongoose.Schema({
  name: {
    type:String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  birthDate: {
    type: String
  },

})

mongoose.model('Contact', contactSchema)
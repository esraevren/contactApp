const mongoose= require('mongoose');

var contactSchema = new mongoose.Schema({
  name: {
    type:String,
    required:[true, "Please add name"]
  },
  lastName: {
    type: String,
    required:[true, "Please last Name"]
  },
  email: {
    type: String,
    required:[true, "Please add  email"]
  },
  phoneNumber: {
    type: String,
    required:[true, "Please add phone number"]
  },
  birthDate: {
    type: String,
    required:[true, "Please add birth date"]
  },

})

 module.exports=mongoose.model('Contact', contactSchema)
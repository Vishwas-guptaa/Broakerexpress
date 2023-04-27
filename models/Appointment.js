const mongoose = require('mongoose')
const AppointmentSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required :true
      },
      lastname:{
        type:String,
        required :true
      },
      email:{
        type:String,
        required :true
      },
      mobile:{
        type:String,
        required :true
      },
      visit:{
        type:String,
        required :true
      },
      date:{
        type:String,
        required :true
      }
      
})
    const AppointmentModel =mongoose.model('Appointment',AppointmentSchema)
    module.exports = AppointmentModel
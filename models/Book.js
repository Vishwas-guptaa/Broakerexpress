const mongoose = require('mongoose')


const BookSchema = new mongoose.Schema({

    name:{
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
      address:{
        type:String,
        required :true
      },
      propertyname:{ 
        type:String,
        required :true
      }




})


    const BookModel =mongoose.model('Book',BookSchema)
    module.exports = BookModel
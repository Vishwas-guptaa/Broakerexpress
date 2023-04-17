const mongoose = require('mongoose')

//define schema
const PropertySchema = new mongoose.Schema({
    prize:{
        type: String,
        require: true
      },
      flatname:{
        type:String,
        required :true
      },
      
      location:{
        type:String,
        required :true
      },
      flatfor:{
        type:String,
        required :true
      },
      area:{
        type:String,
        required :true
      },
      bath:{
        type:String,
        required :true
      },
      facility:{
        type:String,
        required :true
      },
      status:{
        type:String,
        required :true
      },
      type:{
        type:String,
        required :true
      },
      all_image:[
        
      ],

      f_image:{
        public_id:{
          type:String 
        },
        url:{
            type:String
          }
        }


})
//create collection
const PropertyModel =mongoose.model('property',PropertySchema)

module.exports = PropertyModel
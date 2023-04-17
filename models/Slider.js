const mongoose = require('mongoose')


//define schema
const SliderSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
      },
      description:{
        type:String,
        required :true
      },
      image:{
        public_id:{
          type:String
        },
        url:{
            type:String
          }
        }


})
//create collection
const SliderModel =mongoose.model('slider',SliderSchema)

module.exports = SliderModel
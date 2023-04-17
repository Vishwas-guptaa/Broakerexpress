const mongoose = require('mongoose')


const url = "mongodb://127.0.0.1:27017/broakerproject"
const live_Url ="mongodb+srv://vishwasgupta81779:vishwas123@cluster0.kq7bujm.mongodb.net/Brokerportalexpress?retryWrites=true&w=majority"



const connectDB =()=>{
    return mongoose.connect(live_Url)


    .then(()=>{
        console.log("Database connected...")

    })
    .catch((error)=>{
        console.log(error)

    })
}

module.exports = connectDB



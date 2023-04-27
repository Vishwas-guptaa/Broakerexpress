const AppointmentModel= require('../../models/Appointment')
class ContactController{
    static appointment =async(req,res)=>{
        try{
              //console.log('hello')
      const result = new AppointmentModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
        visit: req.body.visit,
        date: req.body.date,
        
        
      });
      //console.log(result)

      await result.save();
      req.flash("Sucess", "Your Appointment is Booked");
      res.redirect('/contact')
        }catch(error){
            console.log(error)
        }

    }

    static appointmentdisplay =async(req,res)=>{
        try{
          const result = await AppointmentModel.find()
             // console.log(result)

              res.render('admin/appoinment/display',{contact:result})
        }catch(error){
            console.log(error)
        }
    }

    static appointmentdelete = async(req,res)=>{
        try{
          //console.log('heelo')
          const remove = await AppointmentModel.findByIdAndDelete(req.params.id);
          res.redirect('/user/appointment')
        }catch(error){
            console.log(error)
        }
    }
}
module.exports = ContactController
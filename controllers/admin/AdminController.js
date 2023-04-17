const AdminModel = require("../../models/Admins")
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')
class AdminController {
    static dashboard = (req, res) => {
      res.render("admin/dashboard");
    }
     
     static register =async(req,res) =>{
      try{
             //console.log('feell')
             const { name, email, password, confirmpassword } = req.body;
             const admin = await AdminModel.findOne({ email: email });

             if (admin) {
              req.flash("error", "Email already exist");
              res.redirect("/register");
            } else {
              if (name && email && password && confirmpassword) {
                if (password && confirmpassword) {
              const hashpassword = await bcrypt.hash(password,10)
             const register = await new AdminModel({
              name: name,
              email: email,
              password:hashpassword
            });
            await register.save();
            res.redirect("/login");

          } else {
            req.flash("error", "Password are not matching");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All field are required");
          res.redirect("/register");
        }
      }
            
      }catch(error){
        console.log(error)
      }
     }


     static verifylogin = async(req,res) =>{
       try{
        //console.log(req.body)
        const {email , password} = req.body
        if(email && password){

          const admin = await AdminModel.findOne({email :email})
          if(admin != null){
            const ismatched = await bcrypt.compare(password,admin.password)
            if(ismatched){
              //generte jwt token
              const token = jwt.sign({id:admin._id},'vishwasgupta123')
              // console.log(token)
              res.cookie('token',token)
              res.redirect('/admin/dashboard')
            }else{
              req.flash('error','Email are password is incorret ')
              res.redirect('/login')
            }
          }else{
            req.flash("error", "you are not a register user");
            res.redirect("/login");
          }
        }else{
          req.flash("error", "all fields are require");
            res.redirect("/login");
        }
      
       }catch(error){
        console.log(error)
       }
     }

     static logout =async(req,res) =>{
      try{
          // console.log('first')
          res.clearCookie('token')
          res.redirect("/login");
      }catch(error){
        console.log(error)
      }
     }

    }


module.exports= AdminController
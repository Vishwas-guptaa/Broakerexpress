const BookModel = require("../../models/Book");
const nodemailer = require("nodemailer");
class Bookcontroller {
  static bookproperty = async (req, res) => {
    try {
      //console.log('hello vishwas')
      const id = req.params.id;
      const clientEmail = req.body.email;
      const property = req.body.propertyname;
      const result = new BookModel({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        propertyname: req.body.propertyname,
      });

      await result.save();
      req.flash("Sucess", "Your Property Book Succesfully , Check Your mail");
      //////////////////////////////////////////////
      this.sendEmail(property,clientEmail);
      //console.log(result);
      res.redirect('/details/'+id)
    } catch (error) {
      console.log(error);
    }
  };

  static readmore = async (req, res) => {
    try {
      const result = await BookModel.find();
      //console.log(result)
      res.render("admin/readmore/read", { read: result });
    } catch (error) {
      console.log(error);
    }
  };

  static bookdelete = async (req, res) => {
    try {
      const remove = await BookModel.findByIdAndDelete(req.params.id);

      res.redirect("/admin/readmore/read");
    } catch (error) {
      console.log(error);
    }
  };

  static sendEmail = async (propertyName, email) => {
    // console.log("email sending")
    //console.log("propertyName")
    // console.log(email)

    //connenct with the smtp server
    let testAccount = await nodemailer.createTestAccount();
    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "vishwasgupta844@gmail.com",
        pass: "jdcmpifdkxjtcdns",
      },
    });
    let info = await transporter.sendMail({
      from: 'test@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Property Book Succesfully", // Subject line
      text: "heelo", // plain text body
      html: `Your Property Book <b>${propertyName}</b>`, // html body
    });
    //console.log("Messge sent: %s", info.messageId);
    
  };
}
module.exports = Bookcontroller;

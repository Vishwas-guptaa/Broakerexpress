const SliderModel = require("../../models/Slider");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddz1pswrm",
  api_key: "288465368246899",
  api_secret: "Zq5bXS-SVjDGmijXiRY4ohoXZ_c",
  // secure: true
});

class SliderController {
  static slider = async (req, res) => {
    try {
      const data = await SliderModel.find();
      //  console.log(data)
      res.render("admin/home/slider",{d:data });
    } catch (error) {
      console.log(error);
    }
  };

  static insertslider = async (req, res) => {
    try {
      //    console.log(req.files.image)
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "SliderImage",
      });
      const result = new SliderModel({
        title: req.body.title,
        description: req.body.description,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });

      await result.save();
     // console.log(result);
      res.redirect("/admin/homeslider");
    } catch (error) {
      console.log(error);
    }
  };

  static sliderview = async (req, res) => { 
    try {
      //  console.log(req.params.id)
      const result = await SliderModel.findById(req.params.id);
      // console.log(result)
      res.render("admin/home/view", { view: result });
    } catch (error) {
      console.log(error);
    }
  };

  

  static slideredit = async (req, res) => {
    try {
      //  console.log(req.params.id)
      const result = await SliderModel.findById(req.params.id);
      // console.log(result)
      res.render("admin/home/edit", { edit: result });
    } catch (error) {
      console.log(error);
    }
  };


  static sliderupdate = async(req, res)=>{
    try{
      // console.log(req.body)
        //console.log(req.params.id)
          //delete image code
          const slider = await SliderModel.findById(req.params.id)
          const imageid = slider.image.public_id
           //console.log(imageid)
           await cloudinary.uploader.destroy(imageid)
            //update image
           const file = req.files.image;
           const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
             folder: "SliderImage",
           });

      const update = await SliderModel.findByIdAndUpdate(req.params.id,{

        title:req.body.title,
        description:req.body.description,
        image:{
          public_id:myimage.public_id,
          
          url:myimage.secure_url
        }

      })  
    
      await update.save()
      res.redirect('/admin/homeslider')

    }catch(error){
      console.log(error)
    }

  }
















  static sliderdelete = async (req, res) => {
    try {
        //delete image code
         const slider = await SliderModel.findById(req.params.id)
         const imageid = slider.image.public_id
          //console.log(imageid)
          await cloudinary.uploader.destroy(imageid)

          await SliderModel.findByIdAndDelete(req.params.id)
      res.redirect("/admin/homeslider");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = SliderController;

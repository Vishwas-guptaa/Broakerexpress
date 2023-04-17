const PropertyModel = require("../../models/Property");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddz1pswrm",
  api_key: "288465368246899",
  api_secret: "Zq5bXS-SVjDGmijXiRY4ohoXZ_c",
  // secure: true
});

class PropertyController {
  static property = async (req, res) => {
    try {
      const result = await PropertyModel.find();
      // console.log(result);
      res.render("admin/home/topproperty", { p: result  });
    } catch (error) {
      console.log(error);
    }
  };

  static inserttopproperty = async (req, res) => {
    try{
    const imagesLink  = []
    // console.log(imagesLink)
    const file = req.files.all_image
    // console.log(file)
    for(let i =0; i<file.length; i++){
      const result = await cloudinary.uploader.upload(file[i].tempFilePath,{
        folder:"coolimage"
      })

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url
      })

    }

    //console.log("cool inserted")
       //console.log(req.body)
     // console.log(req.files.f_image)
      //console.log(req.files.all_image)
      const frontimg = req.files.f_image;
  
   
      const myimage = await cloudinary.uploader.upload(frontimg.tempFilePath, {
        folder: "PropertyImage",
      });

      const result = new PropertyModel({
        prize: req.body.prize,
        flatname: req.body.flatname,
        type: req.body.type,
        location: req.body.location,
        flatfor: req.body.flatfor,
        area: req.body.area,
        bath: req.body.bath,
        facility: req.body.facility,
        status: req.body.status,
        all_image:imagesLink,
        f_image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });
      await result.save();
     // console.log(result);

      res.redirect("/admin/hometopproperty");
    } catch (error) {
      console.log(error);
    }
  }


  static propertyview = async (req, res) => {
    try {
      //  console.log(req.params.id)
      const result = await PropertyModel.findById(req.params.id);
      // console.log(result)
      res.render("admin/home/p_view", { pview: result });
    } catch (error) {
      console.log(error);
    }
  };







  static propertydelete = async (req, res) => {
    try {
      //cloudinary server image delete code 
      const property = await PropertyModel.findById(req.params.id)
      const imageid = property.f_image.public_id
      // console.log(imageid)
      await cloudinary.uploader.destroy(imageid)
      const remove = await PropertyModel.findByIdAndDelete(req.params.id);

      res.redirect("/admin/hometopproperty");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = PropertyController;

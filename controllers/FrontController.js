const SliderModel = require("../models/Slider");
const PropertyModel = require("../models/Property");



class FrontController {
  static home = async (req, res) => {
    const data = await SliderModel.find();
    const result = await PropertyModel.find().limit(6);
    // console.log(result)

    res.render("home", { d: data, r: result });
  };

  static about = (req, res) => {
    res.render("about");
  };

  static property = async (req, res) => {
    const result = await PropertyModel.find();

    res.render("property", { r: result });
  };
  static contact = (req, res) => {
    res.render("contact");
  };

  static addproperty = (req, res) => {
    res.render("addproperty");
  };

  static detail = async (req, res) => {
    try {
      const result = await PropertyModel.findById(req.params.id);

      res.render("details", { p:result ,message: req.flash('Sucess')})
      //console.log(result);
     
    } catch (error) {
      console.log(error);
    }
  };



  static register = async(req,res) =>{
    try{
           res.render('register',{message:req.flash('error')})
    }catch(error){
      console.log(error)
    }
            
  }


  static login = async(req,res) =>{
    try{
           res.render('login',{message:req.flash('error')})
    }catch(error){
      console.log(error)
    }
            
  }



  static readmoreabout = async(req,res) =>{
    try{
           res.render('about/readmore')
    }catch(error){
      console.log(error)
    }
            
  }

  



  static searching =async (req,res) =>{
   try{
        const data=req.body.search
        // console.log(data)
        if(data){
          const search_data = await PropertyModel.find({"location":{ $regex:data}})
          // console.log(search_data)
           res.render('search',{users:search_data})
        }
        
   }catch(error){
    console.log(error)
   }

  }
  }
    

  //  res.render("search")


  
  


module.exports = FrontController;

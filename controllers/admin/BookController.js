const BookModel = require("../../models/Book");

class Bookcontroller{

    static bookproperty = async(req,res) =>{
        try{
            //console.log('hello vishwas')
            const id = req.params.id
            const result = new BookModel({
                name:req.body.name,
                mobile:req.body.mobile,
                address:req.body.address,
                propertyname:req.body.propertyname
              });
        
              await result.save();
              req.flash("Sucess", "Submit Succesfully")
             // console.log(result);
              res.redirect(`/details/${id}`);

        }catch(error){
            console.log(error)
        }
    }


    static readmore = async(req,res) =>{
    try{
        
        const result = await BookModel.find();
        //console.log(result)
         res.render("admin/readmore/read",{read:result})

    }catch(error){
        console.log(error)
    }
}

    static bookdelete =async(req,res)=>{
        try{
            const remove = await BookModel.findByIdAndDelete(req.params.id);

      res.redirect("/admin/readmore/read");       
        }catch(error){
           console.log(error)
        }
    }



}
module.exports = Bookcontroller

       
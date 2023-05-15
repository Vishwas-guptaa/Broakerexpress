const express = require("express");
const router = express.Router();
const FrontController = require("../controllers/FrontController");
const AdminController = require("../controllers/admin/AdminController");
const Router = require("express");
const SliderController = require("../controllers/admin/SliderController");
const PropertyController = require("../controllers/admin/PropertyController");
const Bookcontroller = require("../controllers/admin/BookController");
const ContactController = require("../controllers/admin/ContactController");
const auth = require("../middleware/auth");

//front controller
router.get("/", FrontController.home); //method
router.get("/about", FrontController.about);
router.get("/property", FrontController.property);
router.get("/contact", FrontController.contact);
router.get("/addproperty", FrontController.addproperty);
router.get("/details/:id", FrontController.detail);
router.post("/search", FrontController.searching);
router.get("/login", FrontController.login);
router.get("/register", auth, FrontController.register);
router.get("/readmore", FrontController.readmoreabout);

//admin controller
router.get("/admin/dashboard", auth, AdminController.dashboard);
router.post("/adminregister", auth, AdminController.register);
router.post("/verifylogin", AdminController.verifylogin);
router.get("/logout", AdminController.logout);
router.get("/changepassword", auth, AdminController.changepassword);
router.post("/adminchangepassword", auth, AdminController.updatepassword);

//Slider controler
router.get("/admin/homeslider", auth, SliderController.slider);
router.post("/insertslider", auth, SliderController.insertslider);
router.get("/admin/home/sliderview/:id", auth, SliderController.sliderview);
router.get("/admin/home/slideredit/:id", auth, SliderController.slideredit);
router.post("/sliderupdate/:id", auth, SliderController.sliderupdate);
router.get("/admin/sliderdelete/:id", auth, SliderController.sliderdelete);

//property controller
router.get("/admin/hometopproperty", auth, PropertyController.property);
router.post("/insertproperty", auth, PropertyController.inserttopproperty);
router.get(
  "/admin/toppropertydelete/:id",
  auth,
  PropertyController.propertydelete
);
router.get("/admin/toppropertyview/:id", auth, PropertyController.propertyview);
router.get(
  "/admin/toppropertyview/:id/:hgf",
  auth,
  PropertyController.propertyview
);
router.get(
  "/admin/toppropertyview/:id/:ghgh/:yugh",
  auth,
  PropertyController.propertyview
);

//Book controller
router.post("/insertbook/:id", Bookcontroller.bookproperty);
router.get("/admin/readmore/read", auth, Bookcontroller.readmore);
router.get("/admin/bookdelete/:id", auth, Bookcontroller.bookdelete);

//contact controller
router.post("/bookappointment", ContactController.appointment);
router.get("/user/appointment", ContactController.appointmentdisplay);
router.get("/user/appointment/delete/:id", ContactController.appointmentdelete);

module.exports = router;

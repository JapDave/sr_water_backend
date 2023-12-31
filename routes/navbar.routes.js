const express=require("express")
const navbarRouter=express.Router()
const navbarController=require("../controller/navbarController")
navbarRouter.get("/navbar",navbarController.getNav)
navbarRouter.post("/navbar/add",navbarController.addNav)
navbarRouter.post("/navbar/edit/:id",navbarController.editNav)

module.exports={
    navbarRouter
}
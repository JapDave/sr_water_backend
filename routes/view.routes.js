const express=require("express")
const viewRouter=express.Router()
const viewController=require("../controller/viewController")

viewRouter.post("/view/add",viewController.addIp)

module.exports={
    viewRouter
}
const express=require("express")
const annualRouter=express.Router()
const annualSchemeController=require("../controller/annualSchemeController")
annualRouter.post("/annual/manager/add",annualSchemeController.addManager)
annualRouter.get("/annual/manager",annualSchemeController.getManager)
annualRouter.post("/annual/login",annualSchemeController.login)
annualRouter.post("/annual/manager/edit/:id",annualSchemeController.editManager)
annualRouter.delete("/annual/manager/delete/:id",annualSchemeController.deleteManager)
annualRouter.get("/annual/manager/search/:name",annualSchemeController.searchManager)
annualRouter.post("/annual/add",annualSchemeController.generateToken)
annualRouter.get("/annual",annualSchemeController.getToken)
annualRouter.get("/annual/:token",annualSchemeController.viewByToken)
annualRouter.post("/annual/edit/:token",annualSchemeController.editByToken)
annualRouter.get("/annual/view/:id",annualSchemeController.viewToken)
module.exports={
    annualRouter
}
const express=require("express")
const outletRouter=express.Router()
const outletController=require("../controller/outletController")

outletRouter.post("/store/add",outletController.addStore)
outletRouter.get("/store",outletController.getStore)
outletRouter.get("/store/:id",outletController.getStoreData)
outletRouter.post("/store/edit/:id",outletController.editOutletData)
outletRouter.delete("/store/delete/:id",outletController.deleteOutlet)
outletRouter.get("/store/search/:name",outletController.searchOutlet)

module.exports={
    outletRouter
}
const express=require("express")
const cardRouter=express.Router()
const cardController=require("../controller/cardController")

cardRouter.post("/card/add",cardController.addCard)
cardRouter.get("/card",cardController.getCard)
cardRouter.get("/card/search/:name",cardController.searchCard)
cardRouter.post("/card/edit/:name",cardController.editDetailCard)
cardRouter.get("/card/:name",cardController.getDetailCard)
cardRouter.delete("/card/delete/:id",cardController.deleteCard)
cardRouter.post("/card/contact/:names",cardController.cardHolderContact)


module.exports={cardRouter}
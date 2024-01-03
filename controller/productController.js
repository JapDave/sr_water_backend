const CardModel = require("../model/cardModel")
const { HomeModel } = require("../model/homeModel")
const ProductModel = require("../model/productModel")

exports.addProduct=async(req,res)=>{
    try {
        let data= ProductModel(req.body)
        await data.save()
        res.send({
            msg:"Product Added Successfully",
            data,
            status:res.statusCode
        })
    } catch (error) {
        res.send({
            msg:error.message,
            error
        })
    }
}
exports.getProduct=async(req,res)=>{
    let {page}=req.query
    try {
        if(page){
            let data=await ProductModel.find().skip((page-1)*12).limit(12).populate("category")
            res.send({
                msg:"Product Archived Successfully",
                data,
                status:res.statusCode       
            })
        }else{
            let data=await ProductModel.find().populate("category")
            res.send({
                msg:"Product Archived Successfully",
                data,
                status:res.statusCode       
            })
        }
    } catch (error) {
        res.send({
            msg:error.message,
            error
        })
    }
}
exports.getproductDetail=async(req,res)=>{
    let {id} =req.params
    try {
        let data=await ProductModel.findById(id).populate("category")
        res.send({
            msg:"Product Archived Successfully",
            data,
            status:res.statusCode    
        })
    } catch (error) {
        res.send({
            msg:error.message,
            error
        })
    }
}
exports.editProductDetail=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await ProductModel.findByIdAndUpdate(id,req.body,{new:true})
        res.send({
            msg:"Product Updated Successfully",
            data,
            status:res.statusCode  
        })
    } catch (error) {
        res.send({
            msg:error.message,
            error
        })
    }
}
exports.deleteProduct=async(req,res)=>{
    let {id}=req.params
    try {
         let data=await ProductModel.findByIdAndDelete(id)
        // let data=await ProductModel.updateMany({_id:id},{$pull:{_id:id}})
        let cardData=await CardModel.updateMany({},{$pull:{products:id}})
         let homeData=await HomeModel.updateMany({},{$pull:{products:id}})
        res.send({
            msg:"Product Deleted Successfully",
            data,
            cardData,
            status:res.statusCode
        })
    } catch (error) {
        res.send({
            msg:error.message,
            error
        })
    }
}

exports.searchProduct=async(req,res)=>{

    let {name}=req.params
    try {
        let data=await ProductModel.find({ name: { $regex: `^${name}`, $options: 'i' } }).populate("category")
        res.send({
            msg:"Product Archived Successfully",
            data,
            status:res.statusCode       
        })
    } catch (error) {
        res.send({
            msg:error.message,
            error
        })
    }
}
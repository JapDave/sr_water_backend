const CategoryModel = require("../model/categoryModel")
const OutletModel = require("../model/outlet.Model")

exports.addStore=async(req,res)=>{
    let {name,address,contact}=req.body
    try {
        let exist=await OutletModel.findOne({name})
        if(exist){
            res.send({
                msg:"Already Exist",
                status:res.statusCode
            })
        }
        else{
            let data=new OutletModel(req.body)
                await data.save()
                res.send({
                    msg:"Store Added Successfully",
                    data,
                    status:res.statusCode
                })
        }
    } catch (error) {
        res.send({
            msg:error.message,
            error,
            status:res.statusCode
        })
    }
}
exports.getStore=async(req,res)=>{
    let {page}=req.query
    try {
        if(page){
            let data=  await OutletModel.find().skip((page-1)*12).limit(12)
            res.send({
                msg:"Data Archeived Successfully",
                data,
                status:res.statusCode
            })
        }else{

            let data=await OutletModel.find()
            res.send({
                msg:"Data Archeived Successfully",
                data,
                status:res.statusCode
            })
        }
    } catch (error) {
        res.send({
            msg:error.message,
            error,
            status:res.statusCode
        })
    }
}
exports.getStoreData=async(req,res)=>{
    let {id}=req.params
    try {
 let data=await OutletModel.findById(id)
            res.send({
                msg:"Data Archeived Successfully",
                data,
                status:res.statusCode
            })
        
    } catch (error) {
        res.send({
            msg:error.message,
            error,
            status:res.statusCode
        })
    }
}
exports.editOutletData=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await OutletModel.findByIdAndUpdate(id,req.body,{new:true})
        res.send({
            msg:"Data Updated Successfully",
            data,
            status:res.statusCode
        })
    } catch (error) {
        res.send({
            msg:error.message,
            error,
            status:res.statusCode
        })
    }
}
exports.deleteOutlet=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await OutletModel.findByIdAndDelete(id)
        res.send({
            msg:"Data Has Been Removed Successfully",
            data,
            status:res.statusCode
        })
    } catch (error) {
        res.send({
            msg:error.message,
            error,
            status:res.statusCode
        })
    }
}
exports.searchOutlet=async(req,res)=>{
    let {name}=req.params
    try {
        let data=await OutletModel.find({ name: { $regex: `^${name}`, $options: 'i' } })
        res.send({
            msg:"Data Archeived Successfully",
            data,
            status:res.statusCode
        })
    } catch (error) {
        res.send({
            msg:error.message,
            error,
            status:res.statusCode
        })
    }
}
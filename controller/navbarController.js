const NavbarModel = require("../model/navbarModel")

exports.addNav=async(req,res)=>{
    let {name}=req.body
    try {
        let exist=await NavbarModel.findOne({name})
        if(exist){
            res.send({
                msg:"Already Exist",
                status:res.statusCode
            })
        }
        else{
            let data=new NavbarModel(req.body)
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

exports.getNav=async(req,res)=>{
    try {
            let data=await NavbarModel.find()
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

exports.getNavData=async(req,res)=>{
    let {id}=req.params
    try {
 let data=await NavbarModel.findById(id)
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
exports.editNav=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await NavbarModel.findByIdAndUpdate(id,req.body,{new:true})
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
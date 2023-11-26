
const { ClientModel } = require("../model/clientModel")
const { ManagerModel } = require("../model/managerModel")

exports.addManager=async(req,res)=>{
    try {
        let exist=await ManagerModel.findOne({name:req.body.name})
        if(exist){
            res.send({
                msg:"Manager Already Exist",
                status:res.statusCode
            })
        }
        else{
            let data=await ManagerModel(req.body)
            await data.save()
            res.send({
                msg:"Manager Added Succesfully",
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

exports.getManager=async(req,res)=>{
    let {page}=req.query
    try {
        if(page){
            let data=await ManagerModel.find().skip((page-1)*12).limit(12)
            res.send({
                msg:"All Manager List Archieved Successfully",
                data,
                status:res.statusCode
            })
        }else{
            let data=await ManagerModel.find()
            res.send({
                msg:"All Manager List Archieved Successfully",
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

exports.deleteManager=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await ManagerModel.findByIdAndDelete(id)
        res.send({
            msg:" Manager Removed Successfully",
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

exports.searchManager=async(req,res)=>{

    let {name}=req.params
    try {
        let data=await ManagerModel.find({ name: { $regex: `^${name}`, $options: 'i' } })
        res.send({
            msg:"Manager Archived Successfully",
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

exports.generateToken=async(req,res)=>{
    // let token="SR"+(Math.floor(Date.now()+Math.random()))
    let length=await ClientModel.countDocuments()
    let pretoken=(length+1).toString().padStart(5,"0")
    let currentDate=new Date()
    let currentMonth=currentDate.getMonth()
    let arr=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
    let token=`${arr[currentMonth]}-${pretoken}`
    try {
        let exist=await ClientModel.findOne({challan_no:req.body.challan_no})
        if(exist){
            res.send({
                msg:"Challan No Already Entered",
                status:res.statusCode
            })
        }else{
            let data=ClientModel({...req.body,token})
            await data.save()
            res.send({
                msg:"Challan No Registered Successfully",
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
exports.getToken=async(req,res)=>{
    let {from,to,userid}=req.query
    try {
        if(from&&to&&userid){
            let data=await ClientModel.find({createdAt:{$gte:from,$lte:to},userid}).populate("userid")
            res.send({
                msg:"All Token Archieved",
                data,
                status:res.statusCode
            })
        }
        else if(from&&to){
            let data=await ClientModel.find({createdAt:{$gte:from,$lte:to}}).populate("userid")
            res.send({
                msg:"All Token Archieved",
                data,
                status:res.statusCode
            })
        }
        else if (userid){
            let data=await ClientModel.find({userid}).populate("userid")
            res.send({
                msg:"All Token Archieved",
                data,
                status:res.statusCode
            })
        }
        else{
            let data=await ClientModel.find().populate("userid")
            res.send({
                msg:"All Token Archieved",
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

exports.login=async(req,res)=>{
    let {name,password}=req.body
    try {
        let exist=await ManagerModel.findOne({name})
        if(exist){
            let data=await ManagerModel.findOne({name,password})
            if(data){
                res.send({
                    data,
                    msg:"You Have been successfully Logged In",
                    status:res.statusCode
                })
            }else{
                res.send({
                    data,
                    msg:"You Have been Entered Wrong Password",
                    status:res.statusCode
                })
            }
        }else{
            res.send({
                msg:"User Doesn't exist",
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
const CardModel = require("../model/cardModel")
const { EMAIL, PASSWORD } = require("../config/pass");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { ContactModel } = require("../model/contactModel");

exports.addCard=async(req,res)=>{
    let {name}=req.body
    let exist =await CardModel.findOne({name})
    if(exist){
        res.send({
            msg:"Already Exist",
            data:req.body,
            status:res.statusCode
        })
    }
    else{
        try {
            let data=CardModel(req.body)
            await data.save()
            res.send({
                msg:"Card Added Successfully",
                data,
                status:res.statusCode
            })
        } catch (error) {
            res.send({
                msg:error.message,
                status:res.statusCode
            })
        }
    }
}

exports.deleteCard=async(req,res)=>{
    const {id}=req.params
    try {
        let data=await CardModel.findByIdAndDelete(id)
        res.send({
            msg:"Card Deleted Successfully",
            data,
            status:res.statusCode
        })
    } catch (error) {
        res.send({
            msg:error.message,
            status:res.statusCode
        })
    }
}

exports.cardHolderContact=async(req,res)=>{
    const {names}=req.params
    let config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      };
    
      let transporter =await nodemailer.createTransport(config);
    
      let MailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "Flourish Creations Private Limited",
          link: "https://www.teamflourish.co/home",
        },
      });
      let response = {
        body: {
          name: "SR Enterprise",
          intro: `Your Message Arrived through  ${names}`,
          table: {
            data: [
              {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                Details: req.body.message,
              },
            ],
          },
        },
      };
      let mail = MailGenerator.generate(response);
      // siddhivinayakgranules@gmail.com 
        let messages = {
        from: EMAIL,
        to: "srwater031987@gmail.com",
        subject: "Contact form",
        html: mail,
        };
    
        try {
        await transporter.sendMail(messages)
        let {phone,name,email,message}=req.body
        let length=await ContactModel.countDocuments()
            let data= ContactModel({name,email,phone,message,inquiry_number: length+1,sales_person:names})
            await data.save()
                res.send({
                    msg:"Message Sent Successfully",
                    data,
                    status:res.statusCode,
                })
        } catch (error) {
            res.send({
                msg:error.message,
                error
            })
        }
}

exports.editDetailCard=async(req,res)=>{
    let {name}=req.params
    try {
        let data=await CardModel.findOneAndUpdate({name},req.body,{new:true})
        res.send({
            msg:"Card Updated Successfully",
            data,
            status:res.statusCode
        })
    } catch (error) {
        res.send({
            msg:error.message,
            status:res.statusCode
        })
    }
}
exports.searchCard=async(req,res)=>{

    let {name}=req.params
    try {
        let data=await CardModel.find({ name: { $regex: `^${name}`, $options: 'i' } })
        res.send({
            msg:"Users Archived Successfully",
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


exports.getDetailCard=async(req,res)=>{
    const {name}=req.params
    try {
        let data=await CardModel.find({name})
        res.send({
            msg:"Card Added Successfully",
            data,
            status:res.statusCode
        })
    } catch (error) {
        res.send({
            msg:error.message,
            status:res.statusCode
        })
    }
}


exports.getCard=async(req,res)=>{
    let {page}=req.query
    try {
        if(page){
            let data=  await CardModel.find().skip((page-1)*12).limit(12)
            res.send({
                msg:"Data Archeived Succesfully",
                data,
                status:res.statusCode
            })
        }else{
            let data=await CardModel.find()
            res.send({
                msg:"Data Archeived Succesfully",
                data,
                status:res.statusCode
            })
        }
    } catch (error) {
        res.send({
            msg:error.message,
            status:res.statusCode
        })
    }
}
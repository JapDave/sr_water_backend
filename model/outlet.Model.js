const mongoose=require("mongoose")
const options = {
    versionKey: false,
    timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
    },
};

const OutletSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true,
        
    },
    contact:{
        type:String,
        require:true
    }
},options)

const OutletModel=mongoose.model("outlet",OutletSchema)
module.exports=OutletModel

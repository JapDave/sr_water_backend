const mongoose=require("mongoose")
const options = {
    versionKey: false,
    timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
    },
};

const NavbarSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    }
},options)

const NavbarModel=mongoose.model("navbar",NavbarSchema)
module.exports=NavbarModel

const mongoose=require("mongoose")
const options = {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: "modifiedAt",
    },
  };

  const managerSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
  },options)

  const ManagerModel=mongoose.model("manager",managerSchema)

  module.exports={
    ManagerModel
  }
const mongoose=require("mongoose")
const options = {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: "modifiedAt",
    },
  };
const viewSchema= new mongoose.Schema({
    ip:{
        type:String
    },
    name:{
        type:mongoose.Types.ObjectId,
        ref:"cards"
    }
},options)

const View =mongoose.model("view",viewSchema)
module.exports= View

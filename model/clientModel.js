const mongoose=require("mongoose")
const options = {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: "modifiedAt",
    },
  };
const clientSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    userid:{
        type:mongoose.Types.ObjectId,
        ref:"manager",
        require:true
    },
    challan_no:{
        type:String,
        require:true

    },
    amount:{
        type:String,
        require:true

    },
    mobile:{
        type:String,
        require:true

    },
    token:{
        type:String,
        require:true
        
    }
},options)

const ClientModel=mongoose.model("Client",clientSchema)

module.exports={
    ClientModel
}
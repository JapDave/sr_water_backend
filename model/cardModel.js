const mongoose = require("mongoose");
const options = {
    versionKey: false,
    timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
    },
};
const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  designation: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  whatsapp: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  bank_name: {
    type: String,
    require: true,
  },
  account_holder: {
    type: String,
    require: true,
  },
  account_number: {
    type: String,
    require: true,
  },
  ifsc: {
    type: String,
    require: true,
  },
  gst_name: {
    type: String,
    require: true,
  },
  gst_address: {
    type: String,
    require: true,
  },
  gst_number: {
    type: String,
    require: true,
  },
  products: {
    type: Array,
    require: true,
  },
  prefix:{
    type:String
  },
  image:{
    type:String
  },
  account_type:{
    type:String
  },
  address_link:{
    type:String
  },
  facebook_link:{
    type:String
  },
  insta_link:{
    type:String
  },
  views:{
    type:Number,
    default:0
  }

},options);

const CardModel=mongoose.model("Card",CardSchema)
module.exports=CardModel

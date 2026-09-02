import { Schema, model } from "mongoose";
const notificationSchema = new Schema({ user:{type:Schema.Types.ObjectId,ref:"user",required:true}, title:{type:String,required:true}, message:{type:String,required:true}, type:{type:String,default:"system"}, isRead:{type:Boolean,default:false} },{timestamps:true});
export default model("notification",notificationSchema);

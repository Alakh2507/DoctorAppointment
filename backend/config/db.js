import mongoose from "mongoose";

const connectDB = async () => {
   try{
   await mongoose.connect("mongodb://127.0.0.1:27017/prescripto");
    console.log(" MongoDB connected successfully");
   }catch(error){
    console.log(`Error:${error.message}`)
   }
}

export default connectDB;

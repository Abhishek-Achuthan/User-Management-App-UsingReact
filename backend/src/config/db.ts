import mongoose from "mongoose";

const connectDB = async () => {

    try{
        await mongoose.connect(process.env.MONGO_URI as string, {
        })
        console.log(`MongoDB Connected: ${mongoose.connection.host}`)
    }catch(err:any){
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;
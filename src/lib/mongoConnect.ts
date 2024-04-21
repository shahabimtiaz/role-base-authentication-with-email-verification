import mongoose from "mongoose";
const mongoConnect = async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URI!);
         mongoose.connection.on('connected',()=>{
            console.log('MongoDB connected successfully!')
         })
         mongoose.connection.on('error',(err)=>{
            console.log('MongoDb is not connected. Error: '+err)
            process.exit(1);
         })
    } catch (error) {
        console.log('MongoDb error: '+error);
        process.exit(1);
    }
}
export default mongoConnect;
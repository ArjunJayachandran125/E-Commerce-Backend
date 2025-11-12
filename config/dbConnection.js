import mongoose from 'mongoose';

const dbConnect = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    } catch(error) {
        console.log("Database connection not established");
        process.exit(1);
    }
};

export default dbConnect;
const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo DB connected");
    }
    catch(error){
        console.error("mongo DB connection failed",error.message);
        process.exit(1); //This tells Node: "The database connection failed, so stop the server."
    }
};

module.exports = connectDB;
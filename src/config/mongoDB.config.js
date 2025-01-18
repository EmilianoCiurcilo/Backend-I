import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        mongoose.connect("mongodb+srv://ciurciloemiliano2003:emi1234@cluster0.zm8ni.mongodb.net/proyecto-backend");
        console.log("MongoDB connected");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};
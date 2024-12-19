import { connect, Types } from "mongoose";

export const connectDB = async () => {
    const URL = "mongodb+srv://ciurciloemiliano2003:emi1234@cluster0.zm8ni.mongodb.net/proyecto-backend";

    try {
        await connect(URL);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.log("Error al conectar con MongoDB", error.message);
    }
};

export const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};
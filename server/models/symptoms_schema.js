import { Schema, model } from "mongoose";

const SymptomsSchema = new Schema({
    name:{
        type:String,
        required:true
    }

}, { timestamps: true });

const Symptoms = model('Symptoms', SymptomsSchema);
export default Symptoms;

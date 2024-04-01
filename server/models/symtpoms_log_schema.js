import { Schema, model } from "mongoose";

const SymptomsLogSchema = new Schema({
    intensity:{
        type:Number,
        required:true,
        min:[1,'Intensity must be between 1 and 10'],
        max:[10,'Intensity must be between 1 and 10']
    },
    symptomId:{
        type:Schema.Types.ObjectId,
        ref:'Symptoms',
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        default:null
    }

}, { timestamps: true });

const SymptomsLog = model('SymptomsLog', SymptomsLogSchema);
export default SymptomsLog;

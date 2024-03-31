import { Schema, model } from "mongoose";

const DailyFoodLogSchema = new Schema({
    date:{
        type:Date,
        required:true
    },
    meals:{
        type:[Schema.Types.ObjectId],
        ref:'Meal'
    },
    feel:{
        type:String,
        enum:['Terrible','Bad','Neutral','Good','Great']
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
}, { timestamps: true });

const DailyFoodLog = model('DailyFoodLog', DailyFoodLogSchema);
export default DailyFoodLog;
import { Schema, model } from "mongoose";

const MealSchema = new Schema({
    title:{
        type:String,
        required:true,
        minLength:[2,'Title must be at least 2 characters long']
    },
    meal:{
        type:String,
        required:true,
        enum:['Breakfast','Lunch','Dinner','Snack']
    },
    description:{
        type:String
    },
    ingredients:{
        type:[String]
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

const Meal = model('Meal', MealSchema);
export default Meal;
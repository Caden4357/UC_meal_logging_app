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
    gutHealthRating:{
        type:Number,
        min:[1,'Rating must be at least 1'],
        max:[5,'Rating must be at most 5']
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
}, { timestamps: true });

const Meal = model('Meal', MealSchema);
export default Meal;
import { Schema, model } from "mongoose";

const imageSchema = new Schema({
    url: String,
}, {timestamps: true});
const Image = model('Image', imageSchema);
export default Image;

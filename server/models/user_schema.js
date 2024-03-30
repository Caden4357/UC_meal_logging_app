import { Schema, model } from "mongoose";
import validator from "validator";
import mongooseUniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
const {isEmail} = validator;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'invalid email'],
        unique: true,
    },
    ibd:{
        type:String,
        enum:['Crohns','UC','Indeterminate','None'],
        default:'None'
    }

}, { timestamps: true });


UserSchema.plugin(mongooseUniqueValidator);

UserSchema.virtual('confirmPassword')
    .get(function () {
        return this._confirmPassword
    })
    .set(function (value) {
        this._confirmPassword = value
    })

UserSchema.pre('validate', function (next) {  
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords Dont Match')
    }
    next()
})

UserSchema.pre('save', function (next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
})

const User = model('User', UserSchema);
export default User;
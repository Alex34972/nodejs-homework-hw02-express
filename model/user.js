const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const {Salt_Factor} = require('../config/constants');


const userSchema = new Schema(
    {
        password:{
            type:string,
            require:["true", "This fild is required"],
        },
        email:{
            type:string,
            require:["true", "This fild is required"],
            unique:true,
            validate(value) {
                const reg = /\S+@\S+\.\S+/;
                return reg.test(String(value).toLowerCase());
        }},
        token: {
            type: string,
            default: null,
          },
       
        name: {
            type: string,
            default: 'Guest'
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },   
)
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(Salt_Factor);
        this.password = await bcrypt.hash(this.password, salt)
    };
    next()
})
userSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}
const User = model('user', userSchema)

module.exports = User;

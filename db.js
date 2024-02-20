const mongoose = require('mongoose');
const { Schema, number } = require('zod');

mongoose.connect("mongodb+srv://itsmk121:100xDev@cluster0.jdpgra6.mongodb.net/PayTM");

const UserSchema = new mongoose.Schema({
    userName : String,
    firstName : String,
    lastName : String,
    password : String
})

const AccountSchema = new mongoose.Schema({
    userId :  {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }  ,//link to user schema table
    balance: Number
})

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Bank', AccountSchema );

module.exports = {
    User,
    Account,
}
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
    password :{type:String,required:true},   
    email : {type:String, required:true, unique:true},

    role: {type:String, default:"admin"},
}, {timestamps:true});

    userSchema.pre("save", async function () {
        if (!this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        }
    });

    module.exports = mongoose.model("user",userSchema);

  

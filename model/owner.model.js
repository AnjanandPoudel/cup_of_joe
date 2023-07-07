const mongoose = require('mongoose');
const crypto = require('crypto');

// Define the owner schema
const ownerSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true
  },
  salt:{
    type:String,
    required: true,
    select:false
  },
  hashed_password:{
    type:String,
    required: true,
    select:false
  },
},{timestamps:true});



ownerSchema.virtual("password")
.set(async function(password){
    this.real_password = password
    this.salt = await this.makeSalt();
    this.hashed_password =  this.encryptPasswordFunc(password,this.salt);
})
.get(function(){
    return this.real_password
})

ownerSchema.methods = {
    authentication(password){
        const encrypt= this.encryptPasswordFunc(password,this.salt);
        if(!encrypt || !this.hashed_password) return false;
        return encrypt === this.hashed_password;

    },

    encryptPasswordFunc(password,salt){
        if(!password) return "";
        try{
            return crypto
            .createHmac("sha256",salt)
            .update(password)
            .digest("hex");

        }
        catch(err){
            console.log(err)
        }
        
    },
    makeSalt(){
        const salt = Math.round(new Date().valueOf() * Math.random())+ "";
        return salt
    }
}


// Create the owner model
const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;

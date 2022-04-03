var mongoose=require('mongoose');
//here I define schema of data
//i ised userId for identify data is inserted ya not
//team is used to store Enter team,
//country code is used to store enter country code
//phone isused to store inter phone no.
const UserSchema=mongoose.Schema({
    userId:{
        type:String,
        min: 12,
        max: 20,
        trim:true,
        required: true
    },
    team:{
        type:String,
        trim:true,
        required:true,
        min:20,
        max:50
    },
    countryCode:{
        type:String,
        min:2,
        max:2,
        trim:true,
        required:true
    },
    phone:{
        type:String,
        required:true,
        min:10,
        max:10
    }
});
const postUser = mongoose.model('akudouser', UserSchema);
module.exports=postUser;
const jwt=require('jsonwebtoken');

const Auth=async (req, res, next)=>{
try{
    // this page check user is authorize or not, 
    const secreate_Key="ukkkkjhsjgsxbvxgsywsbxygsyxvshvxyx";
const token=req.cookies.jwt;
//const varifiUser=jwt.verify(token, secreate_Key);
jwt.verify(token, secreate_Key, (err, decodede)=>{
    if(err)
    res.status().send("You are not authorize");
    else
    {
        console.log("You are Authenticate user");
        next();
    }
})
 

}
catch(err){
   res.status(400).send(err);
}
}
module.exports=Auth;
const User=require('../models/User.js');
var jwt=require('jsonwebtoken');

let data={"userId":"","team":"","countryCode":"","phone":""}
//data is used to keep userid , team country code and phone number

const getUsers = async (req, res) => {
   //This is used to find find all afailable data
    try{
        const users = await User.find({});
        res.status(200).send(users);
    }catch( error ){
        res.status(404).send({ message: error.message })
    }
}


const addTeam=async (req, res)=>{
    try{
        const team=req.params.id;
        data["team"]=team;
        const secreate_Key="ukkkkjhsjgsxbvxgsywsbxygsyxvshvxyx";
         const token=await jwt.sign({_id:"624894e0363918073c60d179"}, secreate_Key, {expiresIn:"24h"});
         res.status(200).send({token:token})
          // here i got team name and store team and send jwt token as response
    }
    catch(err){
        res.status(400).send(err)

    }
}
const addPhone=async (req, res)=>{
    
    try{
        
       const countryCode=req.body.countryCode;
       const phone=req.body.phone;
         //here i got country code and phone number
         let token=req.headers.authorization;
          const tokens=token.split(' ')[1];
          const secreate_Key="ukkkkjhsjgsxbvxgsywsbxygsyxvshvxyx";
          jwt.verify(tokens, secreate_Key, async(err, decodede)=>{
            if(err)
            res.status(401).send("You are not authorize");
            else
            {
                //here i varify token after i create another json token and otp using country code and phone number
                //I am interesting to keep length of otp is 6 digit
                // I stored token and otp with expired time
               
       const token1=await jwt.sign({_id:"624894e0363918073c60d179"}, secreate_Key, {expiresIn:"24h"});
      
       res.cookie('jwt', token1,{ maxAge: 24*60*60*1000, httpOnly: true })

     const num=countryCode+phone;

      data["userId"]=num;
      data["countryCode"]=countryCode;//here i update data value
      data["phone"]=phone;
   
    if(phone.length!=10)
     res.status(400).send({Error:"Please Enter 10 digit mobile Number"})

       let i=Math.floor(Math.random()*100)%5; //for generate  unique OTP
      const otpValue=num.substr(i, 6);
       res.cookie('otp', otpValue, { maxAge: 5*60*1000, httpOnly: true })

       console.log("The OTP should only be valid for 5 mins");
    res.status(200).send({token:token1, otp:otpValue})
            }
        })
    }
    catch(err){
        res.send(400).send(err);
    }
}

const checkOtp= async(req, res)=>{
try{
    const userOtp=req.body.otp;
     const cookieOtp=req.cookies.otp;
       
     let token=req.headers.authorization;
     const tokens=token.split(' ')[1];
     const secreate_Key="ukkkkjhsjgsxbvxgsywsbxygsyxvshvxyx";
     //here is varify token
     jwt.verify(tokens, secreate_Key, async(err, decodede)=>{
       if(err)
       res.status(401).send("You are not authorize");
       else
       {
           //I get opt from user and check user enter otp is equal to generate otp or not
           //if enter otp is correct then check data  is presend ya not if data in not presend then save all data 
           //in mongodd
           if(userOtp===cookieOtp){
            const dublicate = await User.find({userId:data.userId});
            if(dublicate.length>0){
                res.status(403).send({dublicate:"User Already Exist"});
            }
        
        const newUser = new User(data);
        try{
            await newUser.save();
            res.status(201).send("Record inserted successfully.");
        } catch (error){
            res.status(409).send({ message: error.message});     
         }
     }
     else{
        res.status(400).send("Please Enter correct Otp and within validity time frame.");
     } 
  
       }
   })
}
catch(err){
  res.status(400).send(err);
}
}







module.exports={  getUsers,  addTeam, checkOtp, addPhone};
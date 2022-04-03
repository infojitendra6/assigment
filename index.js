var express=require('express');
var bodyParser=require('body-parser');
var cookiesParser=require('cookie-parser')
var dotenv=require('dotenv');
var cors=require('cors')
 var Connection=require('./services/Connection.js')
 var auth =require('./authenticate/auth.js')
 
 const { getUsers, addTeam, checkOtp, addPhone}=require('./routers/userCountrol.js');

  var app=express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
app.use(cookiesParser());
  app.use(cors());
  //body-parser is used middle layer library because i use json and url encoded.
  //I want to use cookies for storing some data so I use cookies parser as middle level library
  //i use cors an middile layer library
  Connection();

  var PORT=8080;
dotenv.config();

app.post('/team/:id', addTeam) 
//temp/:id, here id is used to take data as paramiter('ironMan' or 'captainAmerica'). response send jwt token
app.post('/phone', addPhone)
///phone is used to send country code and country number as request and get jwt token and OTP as response
app.post('/otp', checkOtp)
  // /otp,  here user send otp as request if opt is currect and input within 5 minites then i save data in mongo db return response
app.get('/user',auth, getUsers)
// her user can get all inserted data, when user is authorised.


  app.get('*', (req, res)=>{
      res.status(404).send("Page not found");
  })
//this is user for not find page.
  app.listen(PORT, ()=>{
      console.log(`Server run on port on ${PORT}`);
  })
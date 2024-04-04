const Useroute =require('express').Router();

const bcrypt = require("bcrypt");

const User =require('../Model/Users');


const jwt = require('jsonwebtoken')



Useroute.post('/post', async (req,res)=>{
          console.log("post require  from UserRouter.js ");
          try {
              const plainPassword = req.body.Password;
              console.log("hfh"+plainPassword);
              const Email = req.body.Email
              const PhoneNumber =req.body.PhoneNumber
              const emailLowerCase = Email.toLowerCase()
              let foundPhone = await findPhone(PhoneNumber);
              let foundEmail = await findEmail(emailLowerCase);
              console.log("Regi "+foundEmail.success);
              console.log("Regi "+foundPhone.success);
              if(foundEmail.success ==false  && foundPhone.success==false){ 
                    const hashPassword = bcrypt.hashSync(plainPassword, 2);
                        const newdata= new User({
                              FullName:req.body.FullName,
                              Email:emailLowerCase,
                              PhoneNumber:PhoneNumber,
                              Password:hashPassword,
                              IsRider:req.body.IsRider
                              })
                        const save= await newdata.save()
                        res.json({success :true ,message:"User is save"})
                      }else{
                        console.log("Email or Password already Register");
                        res.status(400).json({success :false ,message: "Email or Password already Register" })
                      }        
          } catch (error){ 
            console.log(error);
            
            res.status(400).json({success :false ,message: error })}
})
// Gmail post
Useroute.post('/gmailRegister', async (req,res)=>{
  console.log("post require  from UserRouter.js ");
  try {
    const Email = req.body.Email;
    const PhoneNumber =req.body.PhoneNumber;
    const emailLowerCase = Email.toLowerCase();
    const IsRider = req.body.IsRider;
    const FullName = req.body.FullName;
    console.log(emailLowerCase);
    console.log(PhoneNumber);
    console.log(IsRider);      
            const newdata= new User({
                  FullName:req.body.FullName,
                  Email:emailLowerCase,
                  PhoneNumber:PhoneNumber,
                  
                  IsRider:req.body.IsRider
                  })
            console.log(newdata);
              const save= await newdata.save()
            
            const token = jwt.sign({
                    id: save._id,
                    FullName:save.FullName
                }, process.env.JWT_SECRET, {expiresIn: 60})

              res.json({success :true ,message:"User is save",result: {FullName,Email,token,IsRider}})
                          
          } catch (error){ 
            console.log(error);
            
            // res.status(400).json({success :false ,message: error })
          }
})

Useroute.post("/adminLogin",async function(req,res){
  try{
    console.log("I am call From user/adminLogin");
    
    const reqEmail = req.body.Email;
    const emailLowerCase = reqEmail.toLowerCase()
        const reqPassword = req.body.Password;
        const existingUser = await User.findOne({Email:emailLowerCase}); // Checking exiting data in database
      if(existingUser === null){
        res.json({ success: false, message: 'User does not exist!' })
      }else{
      const { _id: id, FullName,Email,Password,IsRider } = existingUser;
      // destructing the id FullName,Password,IsRider From data 
          // console.log(reqPassword);
          // console.log(Password);
          
        if(bcrypt.compareSync(reqPassword, Password) === true){
          // Making the token from website which expiresIn in 60 min 
          const token = jwt.sign(
            {
                id,
                FullName
            },
            process.env.JWT_SECRET,
            { expiresIn: 60 }
        )
        //  If the All good the send the to client side
        res.status(200).json({ success: true, result: { FullName, Email,IsRider,token } })
        }else if(bcrypt.compareSync(reqPassword, Password) === false){
          res.json({ success: false, message: 'Password is wrong' });
        }
      }
    } catch(error){
      res.json({ success: false, message: error })
      
    }
})
// User login with gmailgggg
Useroute.post("/gmailLogin", async function (req, res) {
  try {
      console.log("user/gmailLogin from User Route.js");
      const reqEmail = req.body.Email;
      const emailLowerCase = reqEmail.toLowerCase()
      let existingUser = await User.findOne({Email: emailLowerCase}) // Checking exiting data in database
      console.log(existingUser);

      if (existingUser === null) {
          console.log("User does not exist!")
          res.json({success: false, message: 'User does not exist!'})
      } else {  
          const {_id: id, FullName, Email, IsRider} = existingUser;
          // console.log(FullName);
            // Making the token from website which expiresIn in 60 min 
          const token = jwt.sign({
              id,
              FullName
          }, process.env.JWT_SECRET, {expiresIn: 60})
          res.status(200).json({success: true,result: {
                      FullName,
                      Email,
                      token,
                      IsRider
                  }
              })
          
      }
  } catch (error) {
      res.json(res.status(400).json({success: false, message: "SomeThing went wrong"}))
  }
})
//phone login
Useroute.post("/phoneLogin", async function (req, res) {
  try {
      console.log("user/phonelogin from User Route.js");
      const   reqPhone = req.body.PhoneNumber;
      let existingUser = await User.findOne({PhoneNumber: reqPhone}) // Checking exiting data in database
      console.log(existingUser);
      if (existingUser === null) {
          console.log("User does not exist!")
          res.json({success: false, message: 'User does not exist!'})
      } else {
          const {_id:id,FullName, Email, IsRider} = existingUser;
          console.log(FullName);
         
          const token = jwt.sign({
              id,
              FullName
          }, process.env.JWT_SECRET, {expiresIn: 60})

          res.status(200).json({success: true,result: {
                      FullName,
                      Email,
                      token,
                      IsRider
                  }
              })
          
      }
  } catch (error) {
      res.json(res.status(400).json({success: false, message: "SomeThing went wrong"}))
  }
})   
// getting the all user 
Useroute.get('/get',async(req,res)=>{
          console.log("getting the all user from UserRouter");
          try {
              const specificItem =await User.find({})
              if (specificItem.length===0){
                res.status(200).json({ success: true, message: "Isnull" })
              }
              res.status(200).json({ success: true, message: specificItem })
          } catch (error) {
                    res.json(error);
          }
})
// getting the all item present in cart
Useroute.get('/get/:id',async(req,res)=>{
 console.log (`getting request from /get/${req.params.id}` );
          try {
              const specificItem =await User.find({_id:req.params.id});
              res.status(200).json({ success: true, message: specificItem })
          } catch (error) {
                    res.json(error);
          }
})
// Getting the specific item with help of email
Useroute.get('/getemail/:email',async(req,res) =>{
  console.log(` getting req from /getemail/${req.params.email} `);
  const data =req.params.email;
  
    try {
      let query =await User.findOne({Email: data})
      res.json({ success: true, message: query });
    }catch (error) {res.json(error);}
})
// Gettting the email and phone at same time
Useroute.get('/getboth/:email/:phone',async(req,res) =>{
  console.log("getting the email get request is working");
  const email =req.params.email;
  const phone =req.params.phone;
  
    let foundPhone = await findPhone(phone);
    let foundEmail = await findEmail(email);
    console.log("foundEmail "+foundEmail.success);
    console.log("foundPhone "+foundPhone.success);
    if(foundEmail.success ==true && foundPhone.success==true){
      res.json({ success: false, message: "Both are already Register" });
      return;
    }
    if(foundEmail.success ==true && foundPhone.success==false){
      res.json({ success: false, message: "Email is already Register" });
    return;
    }
    if(foundEmail.success ==false && foundPhone.success==true){
      res.json({ success: false, message: "Phone is already Register" });
      return;
    }
    else{
      res.json({ success: true, message: "Both are not Register" });
      return;
    }
    
})
async function findPhone(phone){
  try {
    console.log(" iam call ed phone from UserRouter ");
    
    let res= await User.findOne({PhoneNumber: phone});    
    if(res!==null){
      return {success: true, message: res._id }
    }else{
      return {success:false, message: "Not Found"}
    }
    
  } catch (error) {
    console.log("ushchdsj");
  }
}
async function findEmail(email){
  try {
    let res= await User.findOne({Email: email})
    if(res!==null){
      return{success: true, message: res}
    }else{
      return {success: false, message: "Not Found"}
    }
  } catch (error) {
    console.log(error);
  }
}
  

// Getting the specific item with help of phone
Useroute.get('/getphone/:phone',async(req,res) =>{
  console.log("getting the phone get rquest is working");
  const data =req.params.phone;
  console.log(data);
    try {
      let foundPhone = await findPhone(data);
      res.json(foundPhone)
    }catch (error) {res.json(error);}
})

// Delete Item
Useroute.delete('/data/:name', async (req,res)=>{
          console.log("Deteling  the aticular get item  rquest is working");
          console.log(req.params.name);
          
          try {
              const deleteItem = await User.findOneAndRemove(req.params.name);
              res.status(200).json('Item_deleted');
          } catch (error) {
              res.json(error)
          }
})
      
// Delte all
Useroute.delete('/cart/empty',async (req, res)=>{
          console.log("/cart/empty get rquest is working");
          try {
              const deleteAll = await User.deleteMany(); 
              res.status(200).json('Items deleted');       
          } catch (error) {
              res.json(error); 
          }
          })


module.exports = Useroute;
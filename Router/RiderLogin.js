const RiderRoute = require('express').Router();
const bcrypt = require("bcrypt");
const RiderLogin = require('../Model/Rider');
const jwt = require('jsonwebtoken');
const { error, log } = require('console');

RiderRoute.post('/post', async(req, res) => {
    try {
        const Email = req.body.Email
        const PhoneNumber = req.body.PhoneNumber
        const emailLowerCase = Email.toLowerCase()
        let foundPhone = await findPhone(PhoneNumber); //  calling the phone fuction to check phone is exist
        let foundEmail = await findEmail(emailLowerCase); //  calling the Email fuction to check email is exist
        console.log(foundPhone);
        console.log(foundEmail);
        if(foundEmail ===true){
            console.log("Email already Register");
            res.status(404).json({success :false ,message: "Email already Register" })
            return;
        }
        if(foundPhone ===true){
            console.log("Phone already Register");
            res.status(404).json({success :false ,message: "Phone already Register" })
            return;
        }
        if(foundEmail ==false  && foundPhone==false){
            console.log("Email and Phone not Register");
        const plainPassword = req.body.Password;
        const hashPassword = bcrypt.hashSync(plainPassword, 2);
        const newdata = new RiderLogin({
            FullName: req.body.Name,
            Email: emailLowerCase,
            PhoneNumber: req.body.PhoneNumber,
            LicenseNo: req.body.Licenseno,
            
            AadharNo:req.body.AadharNo,
            Password: hashPassword,
            Rc: req.body.Rc,
            IsRider: true
        })
        
        const save = await newdata.save();
        console.log(save);
        
        if(!save){
            console.log("Rider not created");
            return res
            .status(500)
            .json({success: false, message: error});
        }
        
        res.json({success: true, message: "Rider created Successfully"})
    }else{
        res.status(400).json({success :false ,message: "Email or Password already Register" })
    }
    } catch (error) {
        res
            .status(400)
            .json({success: false, message: error});
    }

})
// getting the all Rider Login Details
RiderRoute.get('/get', async(req, res) => {
    console.log("getting the all Rider Login Details");
    try {
        const specificItem = await RiderLogin.find({})
        res
            .status(200)
            .json(specificItem)
    } catch (error) {
        res
            .status(400)
            .json({success: false, message: "SomeThing went wrong"});
    }
})
// getting the item by its ID present in cart
RiderRoute.get('/get/:id',async(req,res)=>{
    console.log(`/get/${req.params.id} get req from Rider Login `);
    try {
              const specificItem =await RiderRoute.find({_id:req.params.id});
              res.status(200).json(specificItem)
    } catch (error) {
             res.status(400).json({success :false ,message: error })
    }
})
// Admin Login
RiderRoute.post("/adminLogin", async function (req, res) {
    try {
        console.log("rider/adminlogin from Rider Route.js");

        const reqEmail = req.body.Email;
        const emailLowerCase = reqEmail.toLowerCase()
        const reqPassword = req.body.Password;
        // console.log(emailLowerCase);
        let existingUser = await RiderLogin.findOne({Email: emailLowerCase}) // Checking exiting data in database
        //  console.log(`userfoun ${existingUser}`);
        if (existingUser === null) {
            res.json({success: false, message: 'Rider does not exist!'})
        } else {
            const {_id: id, FullName, Email, Password, IsRider} = existingUser;
            console.log(FullName);
            if (bcrypt.compareSync(reqPassword, Password) === true) {

                const token = jwt.sign({
                    id,
                    FullName
                }, process.env.JWT_SECRET, {expiresIn: 60})

                res.status(200).json({success: true,result: {
                            id,
                            FullName,
                            Email,
                            token,
                            IsRider
                        }
                    })
            } else if (bcrypt.compareSync(reqPassword, Password) === false) {
                res.json({success: false, message: 'Password is must wrong'});
            }
        }
    } catch (error) {
        res.json(res.status(400).json({success: false, message: "SomeThing went wrong"}))
    }
})
// Rider Register with Gmail
RiderRoute.post('/gmailRegister', async(req, res) => {
    try {
        console.log("rider/gmailRegister from Rider Route.js");
        const Email = req.body.Email
        const emailLowerCase = Email.toLowerCase();
        const PhoneNumber = req.body.PhoneNumber
        let FullName = req.body.Name;
        let IsRider = true;
    
        console.log("Rider Register with Gmail");
        const newdata = new RiderLogin({
            FullName: req.body.Name,
            Email: emailLowerCase,
            PhoneNumber: PhoneNumber,
            LicenseNo: req.body.Licenseno,
            AadharNo:req.body.AadharNo,
            Password: req.body.Password,
            Rc: req.body.Rc,
            IsRider: true
        })
        console.log(newdata);
        const save = await newdata.save();
        console.log(save);
        
        if(!save){
            console.log("Rider not created");
            return res
            .status(500)
            .json({success: false, message: error});
        }
        const token = jwt.sign({
                id: save._id,
                FullName:save.FullName
            }, process.env.JWT_SECRET, {expiresIn: 60})

        res.json({success: true, message: "Rider created Successfully",result: {FullName,Email,token,IsRider}})
    
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: "error"});
    }
})

// Rider Login with Gmail 

RiderRoute.post("/gmailLogin", async function (req, res) {

    try {   
        console.log("rider/gmaillogin from Rider Route.js");
        const reqEmail = req.body.Email;
        const emailLowerCase = reqEmail.toLowerCase()
        let existingUser = await RiderLogin.findOne({Email: emailLowerCase}) // Checking exiting data in database
        console.log(existingUser);
        if (existingUser === null) {
            console.log("Rider does not exist!")
            res.json({success: false, message: 'Rider does not exist!'})
        } else {
            const {_id: id, FullName, Email, IsRider} = existingUser;
            console.log(FullName);
            const token = jwt.sign({
                id,
                FullName
            }, process.env.JWT_SECRET, {expiresIn: 60})

            res.status(200).json({success: true,result: {
                        id,
                        FullName,
                        Email,
                        token,
                        IsRider
                    }
                })
            
        }
    }
    catch (error) {
        res.json(res.status(400).json({success: false, message: "SomeThing went wrong"}))
    }
}); 
//phone login
RiderRoute.post("/phoneLogin", async function (req, res) {
    try {
        console.log("rider/phonelogin from Rider Route.js");
        const   reqPhone = req.body.PhoneNumber;
        let existingUser = await RiderLogin.findOne({PhoneNumber: reqPhone}) // Checking exiting data in database
        console.log(existingUser);
        if (existingUser === null) {
            console.log("Rider does not exist!")
            res.json({success: false, message: 'Rider does not exist!'})
        } else {
            const {_id: id, FullName, Email, IsRider} = existingUser;
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

// Getting the specific phoneno item with help of phone
RiderRoute.get('/getphone/:phone', async(req, res) => {
    console.log("getting the paticular get request is working");
    const data = req.params.phone;
    console.log(data);
    try {
        let query = await RiderLogin.findOne({PhoneNumber: data})
        res.json(query);
    } catch (error) {
        res
            .status(400)
            .json({success: false, message: "SomeThing went wrong"})
    }
})
// Getting the both email and phone in RiderLogin
RiderRoute.get('/getboth/:email/:phone',async(req,res) =>{
    console.log("getting the oin line 271");
    const email =req.params.email || null;
    const phone =req.params.phone || null;

    if(email ==null || phone ==null){
        res.json({ success: false, message: "Email or Phone is not provided" });
    }
    console.log(req.params.email);
    console.log(phone);
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

// Getting the specific item with help of email
RiderRoute.get('/getemail/:email', async(req, res) => {
    console.log("getting the email get rquest is working");
    const data = req.params.email;
    console.log(data);
    try {
        let query = await RiderLogin.findOne({Email: data})
        res.json(query);
    } catch (error) {
        res
            .status(400)
            .json({success: false, message: "SomeThing went wrong"})
    }
})

async function findPhone(phone) {
    try {
        console.log(" iam call Phone from RiderLogin");

        let res = await RiderLogin.findOne({PhoneNumber: phone})
        console.log(res);

        if(res!==null){
            return {success: true, message: res._id }
          }else{
            return {success:false, message: "Not Found"}
          }

    } catch (error) {
        console.log(error);
    }
}
async function findEmail(email) {
    try {
        console.log(" iam call Email");
        let res = await RiderLogin.findOne({Email: email})
        if(res!==null){
            return{success: true, message: res}
          }else{
            return {success: false, message: "Not Found"}
          }
        } catch (error) {
          console.log(error);
        }
}
// Delete Item
RiderRoute.delete('/delete/:name', async(req, res) => {
    console.log(`/delete/${req.params.name}`);
    try {
        const deleteItem = await RiderLogin.findOneAndRemove(req.params.name);
        res
            .status(200)
            .json('Item_deleted');
    } catch (error) {
        res
            .status(400)
            .json({success: false, message: "SomeThing went wrong"})
    }
})

// Delte all
RiderRoute.delete('/empty', async(req, res) => {

    try {
        const deleteAll = await RiderLogin.deleteMany();
        res
            .status(200)
            .json('Items deleted');
    } catch (error) {
        res
            .status(400)
            .json({success: false, message: "SomeThing went wrong"})
    }
})

module.exports = RiderRoute;
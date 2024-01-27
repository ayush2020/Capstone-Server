const RiderLoginRoute =require('express').Router();
const bcrypt = require("bcrypt");

const session = require('express-session');
const passport = require("passport");
const RiderLogin =require('../Model/RiderLogin');

LocalStrategy = require('passport-local').Strategy;
// passport.use(Rider.createStrategy());
const jwt = require('jsonwebtoken');
// 
// Serializer User
passport.serializeUser(function(user, done) {
  process.nextTick(function() {
  done(null, user._id);
});
});
//  Deserializer User
passport.deserializeUser(function(id, done) {
    process.nextTick(function() {
      Rider.findById(id, function(err, user) {
            done(err, user);
            console.log("error"+err);
            console.log("user"+user);
          });
});
});
RiderLoginRoute.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

RiderLoginRoute.post('/post', async (req,res)=>{
          try {
            const plainPassword = req.body.Password;
            // if (plainPassword.length < 6)
            // return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })
            const email= req.body.Email;
            const emailLowerCase = email.toLowerCase()
            const hashPassword = bcrypt.hashSync(plainPassword, 2);

                    const newdata= new RiderLogin({
                        Fullname:req.body.Name,
                        Email:emailLowerCase,
                        PhoneNumber:req.body.PhoneNumber,
                        Licenseno:req.body.Licenseno,
                        Vehicleno:req.body.Vehicleno,
                        Password:hashPassword,
                        Rc: req.body.Rc,
                        IsRider:true
                    })
                    console.log(newdata);
                    const save= await newdata.save()
                    res.json("Ride created")
                    
          } catch (error) {console.log(error);}
          
})
// getting the all item present in cart
RiderLoginRoute.get('/get',async(req,res)=>{
          console.log("getting the all item present in cart get requst is working");
          try {
                    const specificItem =await RiderLogin.find({})
                    res.status(200).json(specificItem)
          } catch (error) {
                    res.json(error);
          }
})
RiderLoginRoute.post("/adminLogin",async function(req,res){
  try{
    console.log("rider/adminlogin");
    
    const reqEmail = req.body.Email;
    const emailLowerCase = reqEmail.toLowerCase()
        const reqPassword = req.body.Password;
        console.log(emailLowerCase);
        let existingUser =await RiderLogin.findOne({Email: emailLowerCase })
       console.log(`userfoun ${existingUser}`);
        if(existingUser === null){
            res.json({ success: false, message: 'User does not exist!' })
        }else{
          const { _id: id, Fullname,Email,Password } = existingUser;
          console.log( Fullname);
        if(bcrypt.compareSync(reqPassword, Password) === true){
                
                
                const token = jwt.sign(
                  {
                      id,
                      Fullname
                  },
                  process.env.JWT_SECRET,
                  { expiresIn: 60 }
              )
          
              res.status(200).json({ success: true, result: { id, Fullname, Email,token } })
        }else if(bcrypt.compareSync(reqPassword, Password) === false){
            res.json({ success: false, message: 'Password is wrong' });
        }
    }
} catch (error) {
    res.json(error)
    
}
})
// Getting the specific phoneno item with help of phone
RiderLoginRoute.get('/getphone/:phone',async(req,res) =>{
  console.log("getting the paticular get rquest is working");
  const data =req.params.phone;
  console.log(data);
    try {
      let query = await RiderLogin.findOne({PhoneNumber: data})
      res.json(query);
    }catch (error) {res.json(error);}
})
// Getting the specific item with help of email
RiderLoginRoute.get('/getemail/:email',async(req,res) =>{
    console.log("getting the email get rquest is working");
    const data =req.params.email;
    console.log(data);
      try {
        let query =await RiderLogin.findOne({Email: data})
        res.json(query);
      }catch (error) {res.json(error);}
  })

// Delete Item
RiderLoginRoute.delete('/data/:name', async (req,res)=>{
          console.log("Deteling  the paticular get item  rquest is working");
          console.log(req.params.name);
          
          try {
              const deleteItem = await RiderLogin.findOneAndRemove(req.params.name);
              res.status(200).json('Item_deleted');
          } catch (error) {
              res.json(error)
          }
})
      
// Delte all
RiderLoginRoute.delete('/cart/empty',async (req, res)=>{
          console.log("/cart/empty get rquest is working");
          try {
              const deleteAll = await RiderLogin.deleteMany(); 
              res.status(200).json('Items deleted');       
          } catch (error) {
              res.json(error); 
          }
          })


module.exports = RiderLoginRoute;
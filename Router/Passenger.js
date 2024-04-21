const PassengerRoute =require('express').Router();

const Passenger =require('../Model/Passengers');

PassengerRoute.post('/', async (req,res)=>{
  try {   
            console.log("Passenger post require is working");
           if(req.body ===null){
            console.log("Data is missing");
            // res.status(400).json({success :false ,message: "Data is missing"})
           }
            const Email = (req.body.Email).toLowerCase();
            
            
            const PhoneNumber =req.body.PhoneNumber
           
            let foundPhone = await findPhone(PhoneNumber);
            let foundEmail = await findEmail(Email);
            console.log(foundEmail);
            console.log(foundPhone);
            
            if(foundEmail.success ==false  && foundPhone.success==false){
              const newdata= new Passenger({
                  FullName:req.body.FullName,
                  Email:Email,
                  PhoneNumber:req.body.PhoneNumber,
                  Gender :req.body.Gender,                 
                  Price: req.body.Price,
                  Distance:req.body.Distance,
                  IsRider:req.body.IsRider,
                  
              })
             console.log(newdata);
              const save= await newdata.save();
              if(save){
                res.status(400).json({success :true, message: "Save Successfully"})
              }else{
                res.json({success :false, message: "not Save"})
              }
            }else{
                res.status(400).json({success :false ,message: "Email or Password already Register" })
            }
              
                    
          } catch (error) {
            console.log(error);
            
            // res.status(409).json({success :false ,message: error }); 
          }
})
// getting the all Passenger 
PassengerRoute.get('/get',async(req,res)=>{
          console.log("getting the all Passenger");
          try {
                    const AllItem =await Passenger.find({})
                    res.status(200).json(AllItem)
          } catch (error) {
                   res.status(400).json({success :false ,message: error })
          }
})
// getting the item by its ID present in cart
PassengerRoute.get('/get/:id',async(req,res)=>{
          console.log(`/get/${req.params.id} get req  from PassengerRoute`);
          try {
                    const specificItem =await Passenger.find({_id:req.params.id});
                    res.status(200).json(specificItem)
          } catch (error) {
                   res.status(400).json({success :false ,message: error })
          }
})

// Getting the specific  Passenger with help of phone
PassengerRoute.get('/getphone/:phone',async(req,res) =>{
  console.log(`/getphone/${req.params.phone}`);
  const data =req.params.phone;
 
    try {
      let query =await Passenger.findOne({PhoneNumber: data})
      res.json({success: true,Data:query});
    }catch (error) {res.json(error);}
})
// Getting the specific  Passenger with help of Emai;
PassengerRoute.get('/getemail/:email',async(req,res) =>{
  console.log(`/getemail/${req.params.email}`);
  const data =req.params.email;
 
    try {
      let query =await Passenger.findOne({Email: data})
      res.json({success: true,Data:query});
    }catch (error) {res.json(error);}
})
// Getting the Passenger details of Rider is REject or Accepted with  help Email 
PassengerRoute.get('/approval/:email',async(req,res) =>{
  console.log(`/getemail/${req.params.email}`);
  const data =req.params.email;
 
    try {
      let query =await Passenger.findOne({Email: data})
      
      res.json({success: true,ConfirmRide:query.confirmRide,RejectRide:query.RejectRide,RiderEmail:query.RiderEmail,Approval:query.Acceptance});
    }catch (error) {res.json(error);}
})

// Geting the path on basic of Source and Destination  
PassengerRoute.get('/getpath',async(req,res)=>{
  console.log("/getpath is working");
  try {
 
let Sp=(req.body.SourcePlace || null).toLowerCase();
let dp=(req.body.DestinationPlace|| null).toLowerCase();
let dot= req.body.dateOfTrip || null ; 
console.log(Sp);
console.log(dp);

if(Sp === null && dp === null){
  let date = await Passenger.find({ dateOfTrip: dot });
  if (date.length != 0) {
    console.log("hi");
        // If no trips are found based on source and destination places, but trips are found based on the date, return them
        res.json({ success: true, message: `No trip found! But based on that datetrip is found`,query: date });   
        return;
    }
}else{
  // Finding the Source Place and Destination Place
let query = await Passenger.find({
  SourcePlace: req.body.SourcePlace,
  DestinationPlace: req.body.DestinationPlace
});
res.json({ success: true, message: query });
return;
}
if(Sp ===null){ // If Souce Place is missing 
  let query = await Passenger.find({ DestinationPlace: dp});
  res.json({ success: true, message: `Source Place Is Missing`,query: query });
  return;
}else{// If Destination Place is missing then 
  let query = await Passenger.find({   SourcePlace: Sp});
  res.json({ success: true, message: `Destination Place is Missing`,query: query });
  return;
}


  } catch (error) {
    res.status(400).json({success :false ,message: error })
  }
})
// Update the  passenger by its Email
PassengerRoute.put('/update/:email',async(req,res)=>{
  console.log(`/update/${req.params.email} put request is working`);
  try {
    const PassengerEmail =req.params.email;
    let  RiderEmail =req.body.RiderEmail;
    // console.log(RiderEmail);
    // console.log("this is  Rider Email "+req.body.RiderEmail)
    const updateData = await Passenger.updateOne({Email:PassengerEmail},{$set:{RiderEmail: RiderEmail}});
    console.log(updateData);
    res.json({success: true, message: "Booking"});
  } catch (error) {
    res.json({success: false, message: error})
}
})
// Passenger rider confirmation
PassengerRoute.put('/confirm/:id',async(req,res)=>{
  console.log(`/confirm/${req.params.id} put request is working`);
  try {
    let passengerId =req.params.id;
   
    
    const updateData = await Passenger.updateOne({_id:passengerId},{$set:{confirmRide: true,RejectRide:false,Acceptance:"done"}});
    // console.log(updateData);
    res.json({success: true, message: "booked successfully"});
  } catch (error) {
    res.json({success: false, message:" error"})
}
})
// Passenger rider Reject
PassengerRoute.put('/reject/:id',async(req,res)=>{
  console.log(`/reject/${req.params.id} put request is working`);
  try {
    let passengerId =req.params.id;
    const updateData = await Passenger.updateOne({_id:passengerId},{$set:{RejectRide: true,confirmRide:false,Acceptance:"done"}});
    // console.log(updateData);
    res.json({success: true, message: "rejected successfully"});
  } catch (error) {
    res.json({success: false, message: error})
}
})
// Update  the  Particular  Data  of Passenger
PassengerRoute.put('default/:email',async(req,res)=>{
  console.log(`/default/${req.params.email} from Passenger.js`);
  try {
    const PassengerEmail =req.params.email;
    const updateData = await Passenger.updateOne({Email:PassengerEmail},{$set:{RiderEmail: RiderEmail}});
  } catch (error) {
    res.json({success:false,message:error});
  }
})
// Update the  Passenger  POD by its gmail
PassengerRoute.put('/updatepod/:email',async(req,res)=>{
  console.log(`/updatepod/${req.params.email} put request is working`);
  try {
    const UserEmail =req.params.email;
    let Price =req.body.Price;
    let  PaymentMethod =req.body.PaymentMethod;
    let  PaymentStatus =req.body.PaymentStatus;
    console.log("this is price"+ Price);
    // console.log("this is  Rider Email "+req.body.RiderEmail)
    const updateData = await Passenger.updateOne({ Email:UserEmail},{$set:{PaymentMethod: PaymentMethod,PaymentStatus:PaymentStatus,Price:Price}});
    console.log(updateData);
    res.json({success: true, message: "Payment Done"});
  } catch (error) {
    res.json({success: false, message: error})
}
}) 


// Delete all
PassengerRoute.delete('/empty',async (req, res)=>{
          console.log("/cart/empty get request is working");
          try {
              const deleteAll = await Passenger.deleteMany(); 
              res.status(200).json({success :true ,message:"Items_ALL_Deleted"});       
          } catch (error) {
             res.status(400).json({success :false ,message: "SomeThing went wrong" }) 
          }
          })

async function findPhone(phone){
try {
    console.log(" i am call From Passenger route  phone");
    
    let res= await Passenger.findOne({PhoneNumber: phone})
    if(res!==null){
    return {success: true, message: "Phone Found", data: res}
    }else{
    return {success: false, message: "Phone Not Found"}
    }
    
} catch (error) {
    console.log(error);
}
}
async function findEmail(email){
try {
    let res= await Passenger.findOne({Email: email})
    if(res!==null){
    return {success: true, message: "Email Found", Data: res}
    }else{
    return {success: false, message: "Email Not Found"}
    }
} catch (error) {
    console.log(error);
}
}
module.exports = PassengerRoute;
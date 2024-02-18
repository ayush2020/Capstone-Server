const PassengerRoute =require('express').Router();

const Passenger =require('../Model/Passengers');

PassengerRoute.post('/', async (req,res)=>{
          console.log("Passenger post require is working");
          try {   
            let SourcePlace= req.body.SourcePlace;
            let DestinationPlace =req.body.DestinationPlace;
            let sourceplace = SourcePlace.toLowerCase();
            let Destination = DestinationPlace.toLowerCase();
            const Email = req.body.Email
            const PhoneNumber =req.body.PhoneNumber
            const emailLowerCase = Email.toLowerCase()
            let foundPhone = await findPhone(PhoneNumber);
            let foundEmail = await findEmail(emailLowerCase);
            
            if(foundEmail ==false  && foundPhone==false){
              const newdata= new Passenger({
                  Fullname:req.body.Name,
                  Email:emailLowerCase,
                  PhoneNumber:req.body.PhoneNumber,
                    Gender :req.body.Gender,
                  SourcePlace:sourceplace,
                  DestinationPlace:Destination,
                  typeOfTrip:req.body.typeOfTrip,
                  dateOfTrip:req.body.dateOfTrip,
                  timeOfTrip:req.body.timeOfTrip,
                 
                  Price: req.body.Price,
                  Distance:req.body.Distance,
                  IsRider:req.body.IsRider
              })
            //  console.log(newdata);
              const save= await newdata.save();
              if(save){
                res.json("Passenger is save")
              }else{
                res.json("Passenger is not save")
              }
            }else{
                res.status(400).json({success :false ,message: "Email or Password already Register" })
            }
              
                    
          } catch (error) {
            res.status(409).json({success :false ,message: error }); 
          }
})
// getting the all item present in cart
PassengerRoute.get('/',async(req,res)=>{
          console.log("getting the all item present in cart get requst is working");
          try {
                    const specificItem =await Passenger.find({})
                    res.status(200).json(specificItem)
          } catch (error) {
                   res.status(400).json({success :false ,message: error })
          }
})

// Getting the specific phoneno item with help of phone
PassengerRoute.get('/getphone/:phone',async(req,res) =>{
  console.log(`/getphone/${req.params.phone}`);
  const data =req.params.phone;
  console.log(data);
    try {
      let query =await Passenger.findOne({PhoneNumber: data})
      res.json({success: true,Data:query});
    }catch (error) {res.json(error);}
})
// Getting the specific item with help of email
PassengerRoute.get('/getingVehicleNo/:VehicleNo',async(req,res) =>{
    console.log(`/getingVehicleNo/${req.params.VehicleNo}`);
    const data =req.params.VehicleNo;
      try {
        let query =await Passenger.findOne({VehicleNumber: data})
        res.json({success: true, Data:query});
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

// Delete Item
PassengerRoute.delete('/delete/:vehicleNumber', async (req,res)=>{
          console.log(`/delete/${req.params.vehicleNumber}`);
          try {
              const deleteItem = await Passenger.findOneAndRemove(req.params.vehicleNumber);
              res.status(200).json({success :true ,message:"Item_deleted"});
          } catch (error) {
            res.status(400).json({success :false ,message: "SomeThing went wrong" })
          }
})
  

// Delete all
PassengerRoute.delete('/empty',async (req, res)=>{
          console.log("/cart/empty get rquest is working");
          try {
              const deleteAll = await Passenger.deleteMany(); 
              res.status(200).json({success :true ,message:"Items_ALL_Deleted"});       
          } catch (error) {
             res.status(400).json({success :false ,message: "SomeThing went wrong" }) 
          }
          })

async function findPhone(phone){
try {
    console.log(" iam call ed phone");
    
    let res= await Passenger.findOne({PhoneNumber: phone})
    if(res!==null){
    return true
    }else{
    return false
    }
    
} catch (error) {
    console.log(error);
}
}
async function findEmail(email){
try {
    let res= await Passenger.findOne({Email: email})
    if(res!==null){
    return true
    }else{
    return false
    }
} catch (error) {
    console.log(error);
}
}
module.exports = PassengerRoute;
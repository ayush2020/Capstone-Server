const TripRoute =require('express').Router();

const TripDetails =require('../Model/TripDetails');

TripRoute.post('/', async (req,res)=>{
          console.log("TripDetails post require is working");
          try {   
            let SourcePlace= req.body.SourcePlace;
            let DestinationPlace =req.body.DestinationPlace;
            let sourceplace = SourcePlace.toLowerCase();
            let Destination = DestinationPlace.toLowerCase();
              const newdata= new TripDetails({
                  Fullname:req.body.Name,
                  VehicleNumber:req.body.VehicleNumber,
                  VehileColour:req.body.VehicleColor,
                  
                  SourcePlace:sourceplace,
                  DestinationPlace:Destination,
                  typeOfTrip:req.body.typeOfTrip,
                  dateOfTrip:req.body.dateOfTrip,
                  timeOfTrip:req.body.timeOfTrip,
                  availableSeat:req.body.availableSeat,
                  PhoneNumber:req.body.PhoneNumber,
                  Price: 0,
                  Distance:"",
                  IsRider:req.body.IsRider
              })
            //  console.log(newdata);
              const save= await newdata.save();
              if(save){
                res.json("TripDetails is save")
              }else{
                res.json("TripDetails is not save")
              }
              
                    
          } catch (error) {
            res.status(409).json({success :false ,message: error }); 
          }
})
// getting the all item present in cart
TripRoute.get('/',async(req,res)=>{
          console.log("getting the all item present in cart get requst is working");
          try {
                    const specificItem =await TripDetails.find({})
                    res.status(200).json(specificItem)
          } catch (error) {
                   res.status(400).json({success :false ,message: error })
          }
})

// Getting the specific phoneno item with help of phone
TripRoute.get('/getphone/:phone',async(req,res) =>{
  console.log(`/getphone/${req.params.phone}`);
  const data =req.params.phone;
  console.log(data);
    try {
      let query =await TripDetails.findOne({PhoneNumber: data})
      res.json({success: true,Data:query});
    }catch (error) {res.json(error);}
})
// Getting the specific item with help of email
TripRoute.get('/getingVehicleNo/:VehicleNo',async(req,res) =>{
    console.log(`/getingVehicleNo/${req.params.VehicleNo}`);
    const data =req.params.VehicleNo;
      try {
        let query =await TripDetails.findOne({VehicleNumber: data})
        res.json({success: true, Data:query});
      }catch (error) {res.json(error);}
  })
// Geting the path on basic of Source and Destination  
TripRoute.get('/getpath',async(req,res)=>{
  console.log("/getpath is working");
  try {
 
let Sp=(req.body.SourcePlace || null).toLowerCase();
let dp=(req.body.DestinationPlace|| null).toLowerCase();
let dot= req.body.dateOfTrip || null ; 
console.log(Sp);
console.log(dp);

if(Sp === null && dp === null){
  let date = await TripDetails.find({ dateOfTrip: dot });
  if (date.length != 0) {
    console.log("hi");
        // If no trips are found based on source and destination places, but trips are found based on the date, return them
        res.json({ success: true, message: `No trip found! But based on that datetrip is found`,query: date });   
        return;
    }
}else{
  // Finding the Source Place and Destination Place
let query = await TripDetails.find({
  SourcePlace: req.body.SourcePlace,
  DestinationPlace: req.body.DestinationPlace
});
res.json({ success: true, message: query });
return;
}
if(Sp ===null){ // If Souce Place is missing 
  let query = await TripDetails.find({ DestinationPlace: dp});
  res.json({ success: true, message: `Source Place Is Missing`,query: query });
  return;
}else{// If Destination Place is missing then 
  let query = await TripDetails.find({   SourcePlace: Sp});
  res.json({ success: true, message: `Destination Place is Missing`,query: query });
  return;
}


  } catch (error) {
    res.status(400).json({success :false ,message: error })
  }
})

// Delete Item
TripRoute.delete('/delete/:vehicleNumber', async (req,res)=>{
          console.log(`/delete/${req.params.vehicleNumber}`);
          try {
              const deleteItem = await TripDetails.findOneAndRemove(req.params.vehicleNumber);
              res.status(200).json({success :true ,message:"Item_deleted"});
          } catch (error) {
            res.status(400).json({success :false ,message: "SomeThing went wrong" })
          }
})
  

// Delete all
TripRoute.delete('/empty',async (req, res)=>{
          console.log("/cart/empty get rquest is working");
          try {
              const deleteAll = await TripDetails.deleteMany(); 
              res.status(200).json({success :true ,message:"Items_ALL_Deleted"});       
          } catch (error) {
             res.status(400).json({success :false ,message: "SomeThing went wrong" }) 
          }
          })


module.exports = TripRoute;
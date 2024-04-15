const TripRoute =require('express').Router();


const TripDetails =require('../Model/TripDetails');

TripRoute.post('/', async (req,res)=>{
          console.log("TripDetails post require is working");
          console.log(req.body.PhoneNumber);
          let dis=req.body.Distance || 650;
          let price =  parseInt(dis)*50;
          try {   
            let SourcePlace= req.body.SourcePlace;
            let DestinationPlace =req.body.DestinationPlace;
            let sourcePlace = SourcePlace.toLowerCase();
            let Destination = DestinationPlace.toLowerCase();
              const newData= new TripDetails({
                  FullName:req.body.Name,
                  Email:req.body.Email,
                  VehicleNumber:req.body.VehicleNumber,
                  VehicleColor:req.body.VehicleColor,
                  VehicleName:req.body.VehicleName,
                  SourcePlace:sourcePlace,
                  DestinationPlace:Destination,
                  typeOfTrip:req.body.typeOfTrip,
                  dateOfTrip:req.body.dateOfTrip,
                  timeOfTrip:req.body.timeOfTrip,
                  AvailableSeat:req.body.availableSeat,
                  PhoneNumber:req.body.PhoneNumber,
                  Price: price,
                  Distance:req.body.Distance,
                  IsRider:req.body.IsRider
              })
             console.log(newData);
              const save= await newData.save();

             
                res.json("TripDetails is save")
              // }else{
              //   res.json("TripDetails is not save")
              // }
              
                    
          } catch (error) {
            console.log(error);
            res.status(409).json({success :false ,message: error }); 
          }
})
// getting the all item present in cart
TripRoute.get('/',async(req,res)=>{
          console.log("getting the all item present from TripDetails.js");
          try {
                    const specificItem =await TripDetails.find({})
                    res.status(200).json(specificItem)
          } catch (error) {
                   res.status(400).json({success :false ,message: error })
          }
})
// getting the trip details of the particular rider using email
TripRoute.get('/getRider/:email',async(req,res)=>{
  console.log(`/getRider/${req.params.email} get re is working from TripDetails.js`);
  try {
            const specificItem =await TripDetails.find({Email: req.params.email});
            res.status(200).json(specificItem)
  } catch (error) {
           res.status(400).json({success :false ,message: error })
  }
});
// getting the particular item present in cart
TripRoute.get('/get/:id',async(req,res)=>{
          console.log(`/get/${req.params.id} get re is working from TripDetails.js`);
          try {
                    const specificItem =await TripDetails.find({_id: req.params.id});
                    console.log("kd")
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
TripRoute.post('/getpath',async(req,res)=>{
    console.log("/getpath is working from TripDetails.js");
    let Sp=(req.body.SourcePlace || null)
    let dp=(req.body.DestinationPlace|| null)
    let dot= req.body.dateOfTrip || null ; 
    console.log(dp);
    console.log(Sp);
    // nh
    if(Sp === null && dp === null && dot === null){
    console.log("All are null");  
    }
  try {
    if(Sp === null && dp === null){
      console.log("Both are null");
    if(dot !== null){ 
      let date = await TripDetails.find({ dateOfTrip: dot });
      if (date.length != 0) {
        console.log("hi");
            // If no trips are found based on source and destination places, but trips are found based on the date, return them
            res.json({ success: true, message: `Trip found! But based on that date`,query: date });   
            
        }else{
            res.json({ success: false, message: `No trip found! on that date ` });
        }
      }else{
        console.log("Date is missing");
        res.json({ success: false, message: `Date is missing` });
      }
    }


if(dp != null && Sp != null){ 
  try {
    console.log("dp and sp are not null");
  
      let sourcePlace = await TripDetails.find({   SourcePlace: Sp});
      if (sourcePlace.length != 0) {
        let destinationPlace = await TripDetails.find({ DestinationPlace: dp});
        if (destinationPlace.length != 0) {
          res.json({ success: true, message: `Trips found based on source and destination places`, query: destinationPlace});
        }else{
          res.json({ success: false, message: `Destination is missing` });
        }
          
      }else{
        try {
          console.log("Source Place Isff  Missing");
        let destinationPlace = await TripDetails.find({ DestinationPlace: dp });
          
        if (destinationPlace.length != 0) {
          res.json({ success: true, message: `Source Place Is Missing`,query: destinationPlace });
        }else{
          res.json({ success: false, message: `to Trip Available` });
        }
      } catch (error) {
        console.log("some error in destinationPlace");
      }
    }

  return;
  } catch (error) {
    console.log("dp and sp are null");
  }
}
  // Finding the Source Place and Destination Place
if(Sp !== null ){
  try {
  console.log("sp is not   null");
  let query = await TripDetails.find({SourcePlace: Sp});
  if (query.length != 0) {
    // If no trips are found based on source and destination places, but trips are found based on the date, return them
    res.json({ success: true, message: `Trips found based on source places`,query: query});
  }else{
    if(dp === null){
      console.log("Destination  Place Is Missing");
      res.json({ success: false, message: `No Trip Found Based On Source Place`});
    
    }
  }
  // console.log(" here dp:= "+query);
  return;
} catch (error) {
  console.log("sp is not  null");
}
}
if(dp !== null){
  try {
    console.log("dp is not null");
    console.log("Sp is  null");
    
  
  // let query = await TripDetails.find({ DestinationPlace: dp});
  // console.log(" here dp:= "+query);
  // res.json({ success: true, message: `Source Place Is Missing`,query: query });
  return;
  } catch (error) {
    console.log("dp is  null");
  }
}




  } catch (error) {
    
    res.status(400).json({success :false ,message: "Something Went wrong" })
  }
})

// Update Item
TripRoute.put('/updateprice/:id',async (req,res)=>{
          console.log(`/update/${req.params.id}`);
          try {
              const updateItem = await TripDetails.findByIdAndUpdate(req.params.id,{$set:{Price: req.body.Price}});
              res.status(200).json({success :true ,message:"Price_updated"});
          } catch (error) {
            res.status(400).json({success :false ,message: "SomeThing went wrong" })
          }
}
)

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
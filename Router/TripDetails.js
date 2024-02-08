const TripDetailsoute =require('express').Router();

const TripDetails =require('../Model/TripDetails');

TripDetailsoute.post('/post', async (req,res)=>{
          console.log("TripDetails post require is working");
          try {   
          
              const newdata= new TripDetails({
                  VehicleNumber:req.body.VehicleNumber,
                  SourcePlace:req.body.SourcePlace,
                  DestinationPlace:req.body.DestinationPlace,
                  typeOfTrip:req.body.typeOfTrip,
                  dateOfTrip:req.body.dateOfTrip,
                  timeOfTrip:req.body.timeOfTrip,
                  availableSeat:req.body.availableSeat,
                  PhoneNumber:req.body.PhoneNumber,
                  IsRider:req.body.IsRider
              })
              console.log(newdata);
              const save= await newdata.save()
              res.json("TripDetails is save")
                    
          } catch (error) {
            res.status(409).json({success :false ,message: error });
            
          }
          // {res.status(400).json({success :false ,message: "SomeThing went wrong" })}
          
})
// getting the all item present in cart
TripDetailsoute.get('/get',async(req,res)=>{
          console.log("getting the all item present in cart get requst is working");
          try {
                    const specificItem =await TripDetails.find({})
                    res.status(200).json(specificItem)
          } catch (error) {
                   res.status(400).json({success :false ,message: error })
          }
})

// Getting the specific phoneno item with help of phone
TripDetailsoute.get('/getphone/:phone',async(req,res) =>{
  console.log("getting the paticular get rquest is working");
  const data =req.params.phone;
  console.log(data);
    try {
      let query =await TripDetails.findOne({PhoneNumber: data})
      res.json(query);
    }catch (error) {res.json(error);}
})
// Getting the specific item with help of email
TripDetailsoute.get('/getemail/:email',async(req,res) =>{
    console.log("getting the email get rquest is working");
    const data =req.params.email;
    console.log(data);
      try {
        let query =await TripDetails.findOne({Email: data})
        res.json(query);
      }catch (error) {res.json(error);}
  })
TripDetailsoute.get('/getpath',async(req,res)=>{
  console.log("/getpath is working");
  try {
    let query =await TripDetails.find({
      SourcePlace: req.body.SourcePlace,
      DestinationPlace:req.body.DestinationPlace
    })
    
    if(query.length===0){
       let date = await TripDetails.find({
          dateOfTrip:req.body.dateOfTrip})
          res.json(date);   
    }else{

      res.json("notnull");
    }
    
    res.json(query);
    
  } catch (error) {
    res.status(400).json({success :false ,message: error })
    
  }
})

// Delete Item
TripDetailsoute.delete('/data/:name', async (req,res)=>{
          console.log("Deteling  the paticular get item  rquest is working");
          console.log(req.params.name);
          
          try {
              const deleteItem = await TripDetails.findOneAndRemove(req.params.name);
              res.status(200).json('Item_deleted');
          } catch (error) {
            res.status(400).json({success :false ,message: "SomeThing went wrong" })
          }
})
  

// Delte all
TripDetailsoute.delete('/cart/empty',async (req, res)=>{
          console.log("/cart/empty get rquest is working");
          try {
              const deleteAll = await TripDetails.deleteMany(); 
              res.status(200).json('Items deleted');       
          } catch (error) {
             res.status(400).json({success :false ,message: "SomeThing went wrong" }) 
          }
          })


module.exports = TripDetailsoute;
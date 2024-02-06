const Rideroute =require('express').Router();

const Rider =require('../Model/TripDetails');



Rideroute.post('/post', async (req,res)=>{
          console.log("rider post require is working");
          try {   
                   
              const newdata= new Rider({
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
              res.json("Rider is save")
                    
          } catch (error) {res.status(400).json({success :false ,message: "SomeThing went wrong" })}
          
})
// getting the all item present in cart
Rideroute.get('/get',async(req,res)=>{
          console.log("getting the all item present in cart get requst is working");
          try {
                    const specificItem =await Rider.find({})
                    res.status(200).json(specificItem)
          } catch (error) {
                   res.status(400).json({success :false ,message: "SomeThing went wrong" })
          }
})

// Getting the specific phoneno item with help of phone
Rideroute.get('/getphone/:phone',async(req,res) =>{
  console.log("getting the paticular get rquest is working");
  const data =req.params.phone;
  console.log(data);
    try {
      let query =await Rider.findOne({PhoneNumber: data})
      res.json(query);
    }catch (error) {res.json(error);}
})
// Getting the specific item with help of email
Rideroute.get('/getemail/:email',async(req,res) =>{
    console.log("getting the email get rquest is working");
    const data =req.params.email;
    console.log(data);
      try {
        let query =await Rider.findOne({Email: data})
        res.json(query);
      }catch (error) {res.json(error);}
  })
Rideroute.get('/getpath',async(req,res)=>{
  console.log("/getpath is working");
  try {
    let query =await Rider.find({
      SourcePlace: req.body.SourcePlace,
      DestinationPlace:req.body.DestinationPlace
    })
    
    if(query.length===0){
       let date = await Rider.find({
          dateOfTrip:req.body.dateOfTrip})
          res.json(date);   
    }else{

      res.json("notnull");
    }
    
    res.json(query);
    
  } catch (error) {
    res.status(400).json({success :false ,message: "SomeThing went wrong" })
    
  }
})

// Delete Item
Rideroute.delete('/data/:name', async (req,res)=>{
          console.log("Deteling  the paticular get item  rquest is working");
          console.log(req.params.name);
          
          try {
              const deleteItem = await Rider.findOneAndRemove(req.params.name);
              res.status(200).json('Item_deleted');
          } catch (error) {
            res.status(400).json({success :false ,message: "SomeThing went wrong" })
          }
})
  

// Delte all
Rideroute.delete('/cart/empty',async (req, res)=>{
          console.log("/cart/empty get rquest is working");
          try {
              const deleteAll = await Rider.deleteMany(); 
              res.status(200).json('Items deleted');       
          } catch (error) {
             res.status(400).json({success :false ,message: "SomeThing went wrong" }) 
          }
          })


module.exports = Rideroute;
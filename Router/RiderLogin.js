const RiderLoginRoute =require('express').Router();

const RiderLogin =require('../Model/RiderLogin');

RiderLoginRoute.post('/post', async (req,res)=>{
          console.log("rider  login post require is working");
          try {
            const {formData} = req.body;
            console.log(formData)
            
                    const newdata= new RiderLogin({
                        Fullname:req.body.Name,
                        Email:req.body.Email,
                        PhoneNumber:req.body.PhoneNumber,
                        Licenseno:req.body.Licenseno,
                        Vehicleno:req.body.Vehicleno,
                        Password:req.body.Password,
                        Rc: req.body.Rc,
                        IsRider:true
                    })
                    console.log(newdata);
                    const save= await newdata.save()
                    res.json("User is save")
                    
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

// Getting the specific phoneno item with help of phone
RiderLoginRoute.get('/getphone/:phone',async(req,res) =>{
  console.log("getting the paticular get rquest is working");
  const data =req.params.phone;
  console.log(data);
    try {
      let query =await RiderLogin.findOne({PhoneNumber: data})
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
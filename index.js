require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const paymentRoutes = require("./Router/Payments");

const cors = require('cors');

const app = express();
let corsAllow = {
    origin : "*",
    // methods: "PUT, GET, POST, DELETE, OPTIONS, PATCH HEAD",
    // Credentials: true,
}
app.use(cors(corsAllow));
mongoose.set('strictQuery', false);

app.use(express.json());

// Mogodb Collection
mongoose.connect(process.env.DB)
.then(()=> console.log('Database connected'))
.catch(err => console.log(err))
mongoose.set('strictQuery', false);



// Routes
const UserRoute = require('./Router/Userouter');
const TripDetails = require('./Router/TripDetails');
const RiderLogin = require('./Router/RiderLogin');
const PassengerRoute = require('./Router/Passenger')
const QueryRouter   = require('./Router/Query');


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.use('/user', UserRoute);
app.use('/tripdet',TripDetails);
app.use('/rider',RiderLogin);
app.use('/passenger',PassengerRoute);
app.use('/query',QueryRouter);
app.use("/api/payment/", paymentRoutes);


//PORT: 4000

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

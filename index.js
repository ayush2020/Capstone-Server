require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');

const bodyParser=require('body-parser')

// const jwt = require('jsonwebtoken')

const cors = require('cors');

const app = express();
app.use(cors({origin:'*'}));
mongoose.set('strictQuery', false);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({origin: '*'}))

// Mogodb Collection
mongoose.connect(process.env.DB)
.then(()=> console.log('Database connected'))
.catch(err => console.log(err))
mongoose.set('strictQuery', false);

// Model
const UserLoginModel=require('./Model/UserLogin');
const RiderLogin = require('./Model/RiderLogin')
const Rider= require('./Model/Rider')

// Routes
const UserRoute = require('./Router/Userouter');
const Riderrouter = require('./Router/Riderrouter');
const RiderLoginrouter = require('./Router/RiderLogin');

app.use('/user', UserRoute);
app.use('/rider',Riderrouter);
app.use('riderlogin',RiderLoginrouter)

//PORT: 4000

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
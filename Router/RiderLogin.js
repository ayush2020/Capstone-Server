const RiderRoute = require('express').Router();
const bcrypt = require("bcrypt");
const RiderLogin = require('../Model/Rider');
const jwt = require('jsonwebtoken');

RiderRoute.post('/post', async(req, res) => {
    try {
        const Email = req.body.Email
        const PhoneNumber = req.body.PhoneNumber
        const emailLowerCase = Email.toLowerCase()
        let foundPhone = await findPhone(PhoneNumber); //  calling the phone fuction to check phone is exist
        let foundEmail = await findEmail(emailLowerCase); //  calling the Email fuction to check email is exist
        if (foundEmail || foundPhone) {
            return  res.status(409).json({success: false, message: "Email Or Phone already Register"})
        } 
        const plainPassword = req.body.Password;
        const hashPassword = bcrypt.hashSync(plainPassword, 2);
        const newdata = new RiderLogin({
            FullName: req.body.Name,
            Email: emailLowerCase,
            PhoneNumber: req.body.PhoneNumber,
            Licenseno: req.body.Licenseno,
            Vehicleno: req.body.Vehicleno,
            AadharNo:req.body.AadharNo,
            Password: hashPassword,
            Rc: req.body.Rc,
            IsRider: true
        })
        // console.log(newdata);
        const save = await newdata.save()
        
        if(!save){
            return res
            .status(500)
            .json({success: false, message: "SomeThing went wrong"});
        }
        
        return res.json({success: true, message: "Rider created Successfully"})

    } catch (error) {
        res
            .status(400)
            .json({success: false, message: "SomeThing went wrong"});
    }

})
// getting the all item present in cart
RiderRoute.get('/get', async(req, res) => {
    console.log("getting the all item present in cart get requst is working");
    try {
        const specificItem = await RiderLogin.find({})
        res
            .status(200)
            .json(specificItem)
    } catch (error) {
        res
            .status(400)
            .json({success: false, message: "SomeThing went wrong"});
    }
})
RiderRoute.post("/adminLogin", async function (req, res) {
    try {
        console.log("rider/adminlogin");

        const reqEmail = req.body.Email;
        const emailLowerCase = reqEmail.toLowerCase()
        const reqPassword = req.body.Password;
        // console.log(emailLowerCase);
        let existingUser = await RiderLogin.findOne({Email: emailLowerCase}) // Checking exiting data in database
        //  console.log(`userfoun ${existingUser}`);
        if (existingUser === null) {
            res.json({success: false, message: 'Rider does not exist!'})
        } else {
            const {_id: id, Fullname, Email, Password, IsRider} = existingUser;
            console.log(Fullname);
            if (bcrypt.compareSync(reqPassword, Password) === true) {

                const token = jwt.sign({
                    id,
                    Fullname
                }, process.env.JWT_SECRET, {expiresIn: 60})

                res
                    .status(200)
                    .json({
                        success: true,
                        result: {
                            id,
                            Fullname,
                            Email,
                            token,
                            IsRider
                        }
                    })
            } else if (bcrypt.compareSync(reqPassword, Password) === false) {
                res.json({success: false, message: 'Password is wrong'});
            }
        }
    } catch (error) {
        res.json(res.status(400).json({success: false, message: "SomeThing went wrong"}))
    }
})
// Getting the specific phoneno item with help of phone
RiderRoute.get('/getphone/:phone', async(req, res) => {
    console.log("getting the paticular get rquest is working");
    const data = req.params.phone;
    console.log(data);
    try {
        let query = await RiderLogin.findOne({PhoneNumber: data})
        res.json(query);
    } catch (error) {
        res
            .status(400)
            .json({success: false, message: "SomeThing went wrong"})
    }
})

// Getting the specific item with help of email
RiderRoute.get('/getemail/:email', async(req, res) => {
    console.log("getting the email get rquest is working");
    const data = req.params.email;
    console.log(data);
    try {
        let query = await RiderLogin.findOne({Email: data})
        res.json(query);
    } catch (error) {
        res
            .status(400)
            .json({success: false, message: "SomeThing went wrong"})
    }
})

async function findPhone(phone) {
    try {
        console.log(" iam call ed phone");

        let res = await RiderLogin.findOne({PhoneNumber: phone})
        console.log(res);

        if (res !== null) {
            return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
    }
}
async function findEmail(email) {
    try {
        console.log(" iam call Email");
        let res = await RiderLogin.findOne({Email: email})
        if (res != null) {
            return true;
        } else 
            return false;

        }
    catch (error) {
        console.log("docew");
    }
}
// Delete Item
RiderRoute.delete('/delete/:name', async(req, res) => {
    console.log(`/delete/${req.params.name}`);
    try {
        const deleteItem = await RiderLogin.findOneAndRemove(req.params.name);
        res
            .status(200)
            .json('Item_deleted');
    } catch (error) {
        res
            .status(400)
            .json({success: false, message: "SomeThing went wrong"})
    }
})

// Delte all
RiderRoute.delete('/empty', async(req, res) => {

    try {
        const deleteAll = await RiderLogin.deleteMany();
        res
            .status(200)
            .json('Items deleted');
    } catch (error) {
        res
            .status(400)
            .json({success: false, message: "SomeThing went wrong"})
    }
})

module.exports = RiderRoute;
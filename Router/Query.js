const queryRouter = require('express').Router();

const Query = require('../Model/Query');

queryRouter.post('/post', async (req, res) => {
    console.log('/post query');
    const query = new Query({
        FullName: req.body.FullName,
        Email: req.body.Email,
        PhoneNumber: req.body.PhoneNumber,
        Query: req.body.Query
    });

    try {
        const savedQuery = await query.save();
        res.json({success: true, result:savedQuery});
    } catch (err) {
        res.json({ success: true, message: err });
    } 
});
queryRouter.get('/get', async (req, res) => {
    try {
        const queries = await Query.find();
        res.json({success: true, result: queries});
    } catch (err) {
        res.json({success: false, result: queries});
    }
});
queryRouter.get('/:queryId', async (req, res) => {
    try {
        const query = await Query.findById(req.params.queryId);
        res.json({success: true, result: query});
    } catch (err) {
        res.json({success: false, result: queries});
    }
}
);
// query find by email

queryRouter.get('/email/:email', async (req, res) => {
    try {
        const query = await Query.find({ Email: req.params.email });
        res.json({success: true, result: query});
    } catch (err) { 
        res.json({success: false, result: queries});
    }
}
);   
module.exports = queryRouter;
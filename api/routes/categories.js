const router = require('express').Router();
const Catergory = require('../models/Category');

// POST CATEGORY
router.post('/',async(req,res)=>{
    const newCat = new Catergory(req.body);
    console.log(newCat);
    try {
        const saveCat = await newCat.save();
        res.status(200).json(saveCat);        
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// GET CATEGORY
router.get('/',async(req,res)=>{
    try {
        const cats = await Catergory.find();
        res.status(200).json(cats);        
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;
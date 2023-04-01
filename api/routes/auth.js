const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


// Register
router.post('/register',async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);

        const alreadyUser = await User.findOne({username: req.body.username});
        const alreadEmail = await User.findOne({email: req.body.email});
        if(alreadyUser || alreadEmail){
          return res.status(403).json("This Username and Email is Already Taken");
        }
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
        });
        const user = await newUser.save();
        res.status(200).json(user);
        const {password,createdAt,updatedAt,_id,...others} = user._doc;
        console.log(others);
    } catch (error) {
        res.status(500).json(error.m);
        console.log(error);
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      // !user && res.status(400).json("Wrong credentials!");
      if(!user){
        return res.status(404).send("Username Is Not Exit");
      }
      const validated = await bcrypt.compare(req.body.password, user.password);
      if(!validated){
        return res.status(401).json("Invalid Username Or Password");
      }
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });

module.exports = router;
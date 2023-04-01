const router = require('express').Router();
const Post = require('../models/Post');

// CREATE POST
router.post('/',async(req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (error) {
        res.status(500).json(error.message);
        console.log(error.message);
    }
});

// UPDATE POST
router.put('/:id',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
            if(post.username === req.body.username ){
                try {
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                        $set:req.body 
                    },{new: true});
                    res.status(200).json(updatedPost);
                } catch (error) {
                    res.status(500).json("You Are Only Update Your Post . . . .");
                }
            }else{
                res.status(401).json("You Are Only Update Your Post");
            }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// DELETE POST
router.delete('/:id',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
            if(post.username === req.body.username ){
                try {
                    await post.delete();
                    res.status(200).json("Post Deleted Successfully")
                } catch (error) {
                    res.status(500).json("Can't Process Your Request");
                    console.log(error);
                }
            }else{
                res.status(401).json("You Are Only Delete Your Post");
            }
    } catch (error) {
        res.status(500).json("Post Not Found");
    }
});

// GET POST
router.get('/:id',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json("Post Not Found");
    }
});

//GET ALL POST
router.get('/',async(req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){
            posts = await Post.find({username:username});
        }else if(catName){
            posts = await Post.find({
                categories: {
                    $in: [catName]
                }
            });
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json("Post Not Found");
    }
});

module.exports = router;
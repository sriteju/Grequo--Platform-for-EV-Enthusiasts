const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const Post = require('../databaseModels/QuestionModel')

router.post("/addQuestion", async (req,res)=>{
    try {        
        const question = req.body.question
         const addQuestion = async () => {
           const newQuestion = new Post({
             question
           });
           await newQuestion.save();
         };
          if (!question) {
            return res.json({ msg: "please enter all fields", added: false });
          }
          await addQuestion();
          res.status(200).json({ msg: "Added Question!", added: true });
    } catch (err) {
      res.json({
        msg: "Can't add Question, please try again later",
        added: false,
      });
    }
});
router.post("/addAnswer", async(req, res)=>{
    try {
        let answer  = req.body.post      
          console.log(answer);
        res.status(200).json({ msg: "Added Answer!", added: true });
    } catch (err) {
      res.json({
        msg: "Can't add Answer, please try again later",
        added: false,
      });
    }
});
router.get('/getQuestions', async (req,res)=>{
    try{
        let posts = await Post.find();
        res.json({
            msg:'recieved succcessfully',
            posts
        })
    }catch(err){
        res.json({
          msg: "Can't find Question, please try again later",
        });
    }
})


module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../databaseModels/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Message = require("../databaseModels/ContactMessageModel");
const authentication = require("../middlewares/authentication");
router.post("/register", async (req, res) => {
  try {
    const { name, username, email, mobile, password, passwordAgain } = req.body;
    const userExist = await User.findOne({ email }); // checking for existing users
    //function to create new user along with hashing password usign bcryptjs package
    const createUser = async () => {
      const salt = await bcrypt.genSalt();
      const passwordHashed = await bcrypt.hash(password, salt); //password hashed

      //new user creating
      const newUser = new User({
        name,
        username,
        email,
        mobile,
        passwordHashed,
      });
      const createdUser = await newUser.save();

      //token generation

      const token = jwt.sign(
        {
          userId: createdUser._id,
        },
        "jNzb-nncUP7asaR_G9JMpH*58hyqGydm*B6e@AYnzxtBxrGhgp"
      );
      return token;
    };

    //validations for entries
    if (
      !name ||
      !username ||
      !email ||
      !mobile ||
      !password ||
      !passwordAgain
    ) {
      return res.json({ msg: "please enter all the fields", added: false });
    } else if (userExist) {
      return res.status(200).json({
        msg: "Account already exist with this email id",
        added: false,
      });
    } else if (password.length < 8) {
      return res.status(200).json({
        msg: "Password is short, enter minimum 8 characters",
        added: false,
      });
    } else if (password !== passwordAgain) {
      return res.json({ msg: "passwords Don't match", added: false });
    } 
    //if no validation error user is being created by calling createUser function
    else {
      const token = await createUser();
      return res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({ msg: "account Created", added: true });
    }
  } catch (err) {
    //if any internal error occured this msg is sent to frontend
    console.error(err);
    res.json({ msg: "sorry for inconvinience, try again later" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await User.findOne({ username: username }); //check if user exists
    if (!existUser) {
      return res.json({ msg: "user does not exist", added: false }); //if user not exist then send response msg
    }
    const pwdCorrect = await bcrypt.compare(password, existUser.passwordHashed); //verify password--if hashed password is generated using provided pwd --returns true/false
    if (!pwdCorrect) {
      return res.json({ msg: "incorrect email or password", added: false }); //if password wrong
    }

    const createToken = async () => {
      const token = await jwt.sign(
        //if pwd user authonticated , send token again to browser
        { userId: existUser._id },
        "jNzb-nncUP7asaR_G9JMpH*58hyqGydm*B6e@AYnzxtBxrGhgp"
      );
      return token;
    };
    const token = await createToken();
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ msg: "logged in successfully", added: true });
  } catch (err) {
    console.error(err);
    res.json({ msg: "sorry for inconvinience, try again later", added: false });
  }
});

router.get("/logout", (req, res) => {
  //when logged out , send empty token , so user will be unauthenticated
  res
    .cookie("token", "", { httpOnly: true, expires: new Date(0) })
    .status(200)
    .json({ msg: "logged out" });
});

router.get("/loggedin", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ isLoggedIn: false, userName: "unauthorized" });
    }
    const verified = await jwt.verify(
      token,
      "jNzb-nncUP7asaR_G9JMpH*58hyqGydm*B6e@AYnzxtBxrGhgp"
    );
    const userName = await User.findOne({ _id: verified.userId }).select({
      name: 1,
      _id: 0,
    });
    if (verified) {
      return res.json({ isLoggedIn: true, userName: userName.name });
    } else {
      return res.json({ isLoggedIn: false, userName: "unauthorized" });
    }
  } catch (err) {
    res.json({ isLoggedIn: false, userName: "unauthorized" });
  }
});

const createMessage = async (post) => {
  try {
    const newMessage = new Message({
      name: post.name,
      email: post.email,
      mobile: post.mobile,
      message: post.message,
    });
    const res = await newMessage.save();
    return "success";
  } catch (err) {
    return err;
  }
};

//post request sending message
router.post("/contact",  (req, res) => {
  try {
    let post = req.body;
    if (
      !post.name ||
      !post.email ||
      !post.mobile ||
      !post.message
    ) {
      return res.json({ msg: "Please fill all details." });
    }
    createMessage(post);
    res.json({ msg: "Your message has bees Recieved." });
  } catch (err) {
    console.error(err);
    res.json({ msg: "sorry, try again" });
  }
});

module.exports = router;
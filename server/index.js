const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const userRouter = require("./Router/userRouter");
const questionRouter = require("./Router/QuestionRouter")
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
// app.use(cookie_parser());

// routers middleware
app.use("/user", userRouter);
app.use("/post", questionRouter);

mongoose
  .connect("mongodb://localhost:27017/tie", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("connection successful..."))
  .catch((err) => console.log(err));

  app.get('/contact',(req,res)=>{
      res.send("contacting....")
  })

  app.get("*", (req, res) => {
    res.send("page does not exist");
  });
  app.post("*", (req, res) => {
    res.send("page does not exist");
  });

  app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
  });
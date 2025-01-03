import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { connectDB } from "./Database/db.js";
import cookieParser from "cookie-parser";
import { authRouter } from "./Routes/authRouter.js";


dotenv.config();

const app = express();
const Port = process.env.PORT || 8000;

//DATABSE
connectDB();

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin : ['http://localhost:5173'],
    methods : ['GET','POST','PUT','DELETE'],
    credentials : true
  }))

//ROUTES
app.use('/api/v1/auth', authRouter)


//SERVER
app.get("/", (req,res) => {
  res.send({
    success: true,
    message: "BACKEND CONNECTED SUCCESSFULLY",
  });
});

app.listen(Port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${Port}`);
});

const express = require("express");
const database = require("./database/mongodg");
const app = express();
const cookieParser =  require('cookie-parser');
const userRouter = require("./router.js/userRouter")
const redisClient = require("./database/redis")
app.use(cookieParser());
const cors = require("cors")
app.use(cors({
    origin: ['https://dsa-visualizer-frontend.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use(express.json());


app.use("/user",userRouter);


// app.get("/", (req, res) => {
//   res.send("Backend is running!");
// });



const instialization=async()=>{
    try{
        
        await Promise.all([database(),redisClient.connect()]);
        console.log("database connect");
        app.listen(1500,(req,res)=>{
            console.log("i am listening at port no 1500");
        })
    }
    catch(err){
        console.log("database connection err : ", err);
    }
}

instialization();

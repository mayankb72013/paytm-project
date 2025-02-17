import express from "express"
import { PrismaClient } from "@prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate";
// import { jwt } from "jsonwebtoken"

const prisma = new PrismaClient().$extends(withAccelerate());
const app = express();
app.use(express.json())
app.post("/signup",async function (req,res){
    const username = req.body.username;
    const password = req.body.password;
// Still have to do input validation
    try{
        await prisma.user.create({
            data: {
                username: username,
                password: password
            }
        })
    }
    catch (e){
        res.status(404).send({
            msg: e
        })
    }
    res.status(200).send({
        msg: "You've been signed up!"
    })
})
app.post("/signin",function (req,res){
   
})

app.post("/updateInfo",function (req,res){

})

app.listen(3000);
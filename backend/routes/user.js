const express = require("express")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const { User, Account } = require("../db/db")
const JWT_SECRET = require("../config")
const { authMiddleware } = require("../middleware")
const router = express.Router()
const signupBody=zod.object({
    username : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
})

router.post("/signup",async function(req,res){   
    const success = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
        
    }
    const existingUser = await User.findOne({
        username : req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
       
    }
    const newUser = await User.create({
        username : req.body.username,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password
    })

    const userId = newUser._id;

    await Account.create({
        userId,
        balance: 1+ Math.random()*10000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET) 

    res.status(200).json({
        message: "User created successfully",
	    token: token
    })

})

const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

router.post("/signin", async function(req,res){
    const success = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const userFind = await User.findOne({
        username:req.body.username,
        password :req.body.password
    })
    if(userFind){
        const userId = userFind._id

        const token = jwt.sign({
           userId 
        },JWT_SECRET)
        return res.status(200).json({
            token : token
        })
        
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody=zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

router.put("/",authMiddleware, async function  (req,res){
    const success = updateBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

   try {
    await User.updateOne({
        _id:req.userId
    },req.body)
    res.status(200).json({
        message: "Updated successfully"
    })
   } catch (error) {
    res.status(411).json({
        message: "Error while updating information"
    })
   } 

})

router.get('/bulk',async (req,res)=>{
    const filter = req.query.filter||"";
    try {
        const searchUsers = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })
    res.status(200).json({
        user: searchUsers.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName : user.lastName,
            userId : user._id
        }))
    })
        
    } catch (error) {
        res.status(403).json({})
    }

})

module.exports=router
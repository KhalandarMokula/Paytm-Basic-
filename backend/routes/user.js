
const { Router,json, urlencoded } = require("express");
const zod = require("zod");
const {User, Account} = require('./../../db')
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");


const userRouter = Router();
userRouter.use(json());
userRouter.use(urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies

const signupSchema = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),
});

userRouter.post('/signup', async (req, res)=> {
    console.log("hi signing up ", req.body);
    let body = req.body;
    
    let success = signupSchema.safeParse( req.body) 
    console.log("1");
    if (!success.success) {
        console.error("Validation Error: ", success.error);
        return res.status(411).json({message: "Validation Error parsing failed"});
    }
    //success
    console.log("2 ", req.body.username);
    const existingUser = await User.findOne({userName: req.body.username});
    if (existingUser) {
        return res.status(411).json({message: "email already taken/ invalid inputs"});
    }
    console.log("4");
    const user = await User.create({
        userName: req.body.username,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password
    })
    console.log("5");
    const userId = user._id;

    var account = await Account.create({
        userId: userId,
        balance: Math.random()*1000,
    })
    console.log("6");
    const token = jwt.sign({userId}, JWT_SECRET);
    console.log("7");
    res.json({
             message: "user created successfully",
             token: token
            });
    console.log("7");
})

const signInBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})


userRouter.get('/signin', async(req,res)=> {
    console.log("signing in ", req.query);
    const {username, password} = req.query;

    let body = req.body;
    let success = signInBody.safeParse(body) 

    if (!success) {
        console.log("zod validation failed");
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    const user = await User.findOne({userName: username,
                                         password: password})
                                    
   if (user) {
    console.log("user found");
        const token = jwt.sign({userId: user._id}, JWT_SECRET);
        res.status(200).json({token: token});
        return;
   } 
   console.log("no user found")
    res.status(411).json({
        message: "Error while logging in"
    })

})

const updateBody = zod.object({
    password:zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

userRouter.put('/', authMiddleware, async(req, res)=> {

    var success = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const userId = req.userId;
    await User.updateOne({
        _id: req.userId
    }, req.body)

    res.json({
        message: "Updated successfully"
    })
});

userRouter.get('/bulk', authMiddleware, async(req, res)=> {
    const filter = req.query.filter || "";
    console.log("filter ", filter);
    const documents = await User.find({
        $or:[{
            firstName: {
                "$regex":filter 
            } 
        }, 
            {
                lastName : {
                    "$regex": filter
                }
            }
        ]
    })
    console.log(documents);
    res.status(200).json({
        documents: documents.map(document => ({
            username: document.userName,
            firstName: document.firstName,
            lastName: document.lastName,
            _id: document._id
        }))
    });
});

module.exports = userRouter;
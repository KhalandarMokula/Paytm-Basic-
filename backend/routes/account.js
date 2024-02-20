
const { authMiddleware } = require("../middleware");
const {UserDb, Account} = require('./../../db');
const { default: mongoose } = require("mongoose");
const { Router,json, urlencoded } = require("express");

const accountRouter = Router();

accountRouter.use(json());
accountRouter.use(urlencoded({ extended: true }));

accountRouter.get('/balance',authMiddleware, async(req, res)=>{
    const userId = req.userId;
    var balance = await Account.find({userId:userId}).select('balance');
    console.log("balance ", balance);
    if (balance) {
        res.json({balance: balance[0].balance});
    }
})


accountRouter.post('/transfer', authMiddleware, async(req, res)=> {
    const userId = req.userId;
    console.log(" accountRouter request body ", req.body);
    const {toUserId, amount} = req.body.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    var fromUserRecord = await Account.findOne({userId: userId});
    if (fromUserRecord.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance",
        });
    }

    var toAccount  = await Account.findOne({userId:toUserId});
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account",
        })
    }
    await Account.updateOne({userId: userId},{$inc: {balance: -amount}});
    await Account.updateOne({userId: toUserId}, {$inc: {balance: amount}});

    await session.commitTransaction();
    res.status(200).json({
        message: "Transaction Sucessfull",
    })
})

module.exports = accountRouter;
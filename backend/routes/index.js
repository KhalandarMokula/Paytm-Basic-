const {Router} = require("express");

const userRouter = require('../routes/user');
const accountRouter = require('../routes/account');


const router = Router();

router.use('/user', userRouter);
router.use('/account', accountRouter);

module.exports= router

const { JWT_SECRET } = require("./config");

const jwt = require("jsonwebtoken")

const authMiddleware= (req, res,next)=> {
     // Header - 
    //     Authorization: Bearer <actual token>
    let authHeader;

    //For Get Request
    if (req.headers && req.headers.authorization ) {
        console.log("request headers ", req.headers.authorization);
        authHeader = req.headers.authorization;
        
        console.log("Authorization token received 2 ", authHeader);
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(403).json({message: "Invalid token"});
        }
    } else  if (req.body) { //For post request
        console.log("request body ", req.body.headers);
        authHeader = req.body.headers.Authorization;
        
        console.log("Authorization token received 1", authHeader);
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(403).json({message: "Invalid token"});
        }
    
    } 
   
    const token = authHeader.split(' ')[1];

    try {
      
        var decodedToken = jwt.verify(token, JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch(err) {
        return res.status(403).json({message: "Invalid token"});
    }
}

module.exports = {
    authMiddleware,
}
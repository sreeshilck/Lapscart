const jwt = require ("jsonwebtoken");
const userModel = require ('../models/userModel')

// checking user is authorized or not
module.exports.authToken = async (req, res, next) => {

    try {
        console.log(req.headers.authorization,"== req.headers.authorization");

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
          let  token = req.headers.authorization.split(' ')[1]

          if (!token) {
            return res.status(401).json({msg:"Unauthorized access"})
        }

        jwt.verify(
            token, process.env.JWT_SECRET,
            async (err, decoded) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({msg:"Unauthorized access"})
                } else {
                    
                   // req.user = await userModel.findById(decoded.id,{password:0});
                   req.user = decoded.id
                    next()  
                }
            })
        } else {
            return res.status(401).json({msg:"Unauthorized access"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal server error"})
    }
    
    


    //const decodedToken = jwt.verify(TokenArray[1], process.env.JWT_SECRET);
    



}


  

// module.exports.verifyUser = (req, res, next) => {
    
//     const token = req.cookies.user 
//     if(token) {
//         jwt.verify(
//             token,
//             process.env.JWT_SECRET,
//             async (err, decodedToken) => {
//                 if(err) {
//                     res.json({status: false});
//                     next();
//                 } else {
//                     const user = await UserModel.findById(decodedToken.id);
//                     if(user) res.json({ status: true, user: user.email});
//                     else res.json({status: false});
//                     next();
//                 }
//             }
//         );
//     } else {
//         res.json({status: false});
//         next();
//     }
// }







// module.exports.verifyAdmin = (req, res, next) => {

//     const token = req.cookies.token 
//     if(token) {
//         jwt.verify(
//             token,
//             process.env.JWT_SECRET,
//             async (err, decodedToken) => {
//                 if(err) {
//                     res.json({status: false});
//                     next();
//                 } else {
//                     const user = await UserModel.findById(decodedToken.id);
//                     if(user) res.json({ status: true});
//                     else res.json({status: false});
//                     next();
//                 }
//             }
//         );
//     } else {
//         res.json({status: false});
//         next();
//     }
// }

// }
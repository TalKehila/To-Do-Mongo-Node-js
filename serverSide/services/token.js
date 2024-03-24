const jwt = require('jsonwebtoken');
const secret = "29vfh4437dcvkxnewj3e98dcj2";

const verifyToken = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(' ')[1];
            if (token) {
                const payload = await jwt.verify(token, secret);
                console.log(payload);
                next();
            } else {
                return res.status(401).send("Authorization error: Token not provided");
            }
        } else {
            return res.status(401).send("Authorization error: Token not provided");
        }
    } catch (error) {
        return res.status(401).send("Authorization error: Invalid token");
    }
};

module.exports = {
    verifyToken,
    secret
};




























// // token js in server side 

// const jwt = require('jsonwebtoken');
// const secret = "29vfh4437dcvkxnewj3e98dcj2";

// const verifyToken = async (req, res, next) => {
//     if (req.headers.authorization) {
//         let token = req.headers.authorization;
//         if (token) {
//             const payload = await jwt.verify(token, secret);
//             console.log(payload);
//             next();
//         } else {
//             return res.status(401).send("Authorization error");
//         }
//     } else {
//         return res.status(401).send("Authorization error");
//     }
// }
// module.exports = {
//     verifyToken, secret
// }
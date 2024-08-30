import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()
const secretKey = process.env.JWT_SECRET
export const authentication = ( req, res, next) => {
   const token = req.header('Authorization');
   if(!token) return res.status(403).send({message:'Access Forbidden, No token Provided'})
       try{
           //using token by taking parts 
           const tokenPart=token.split(' ');
           if(tokenPart.length!==2){
               return res.status(401).send({message:'Invalid token format'})
           }
           const tokenType=tokenPart[0];
           const tokenValue=tokenPart[1];
           if(tokenType!=='Bearer'){
               return res.status(401).send({message:'Invalid token type'})
           }
           
   jwt.verify(tokenValue,secretKey,(error,user) => {
       if(error){
           return res.status(401).json('Invalid Token')
       }
       req.user=user;
       next();
   });
   }
   catch(err){
       return res.status(500).json(err.message);
   }
}


// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();
// const secretKey = process.env.JWT_SECRET;

// export const authentication = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }
//         req.user = decoded;
//         next();
//     });
// }
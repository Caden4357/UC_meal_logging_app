import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET

export default function authenticate (req, res, next) {
    const {authorization} = req.headers;
    console.log('LINE 8', authorization);
    jwt.verify(authorization, JWT_SECRET, (err,payload) => {
        if(err){
            console.log(err);
            res.status(401).json({verified: false})
        }
        else{
            console.log('LINE 13', payload);
            next()
        }
    })
}
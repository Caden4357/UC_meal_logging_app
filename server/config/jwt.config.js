import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET


export default function authenticate(req, res, next) {
    const { authorization } = req.headers; // extract the token from the headers
    // const token = authorization && authorization.split(' ')[1]; // split the token from the Bearer
    // if (!token) {
    //     return res.status(401).json({ message: 'Unauthorized' }); // if there is no token, return unauthorized
    // }
    // console.log('LINE 10', token); // log the token
    jwt.verify(authorization, JWT_SECRET, (err, payload) => {
        if (err) {
            console.log(err);
            res.status(401).json({ verified: false }) // if there is an error, return unauthorized
        }
        else {
            console.log('LINE 13', payload); // log the payload
            next()  // if there is no error, move on to the next middleware
        }
    })
}
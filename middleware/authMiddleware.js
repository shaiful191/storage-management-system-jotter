import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  // const token = req.header('Authorization');
  const authHeader = req.header('Authorization'); // Get Authorization header

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const token = req.header('Authorization').replace('Bearer ', '');

  // if (!token) {
  //   return res.status(401).json({ msg: 'No token, authorization denied' });
  // }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ msg: 'Authentication failed, user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};


// const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.header('Authorization'); // Get Authorization header

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }


//     const token = authHeader.replace('Bearer ', ''); // Remove 'Bearer ' prefix
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

//     req.user = await User.findById(decoded.id).select('-password'); // Get user data
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }

//     next(); // Proceed to next middleware
//   } catch (error) {
//     res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };




export default authMiddleware;

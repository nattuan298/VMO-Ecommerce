import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("jwt");

    if (!token) {
      return res.status(401).json({
        message: "Access Denied"
      })
    }
    const user = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    req.user = user
    return next();
  } catch (error) {
    return res.status(401).send({ statusCode: 401, message: 'Not authorized', data: error })
  }
}
export default verifyToken;
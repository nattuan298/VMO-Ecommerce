import User from '../Models/user.model.js';

const verifyPasswordChange = async (req, res, next) => {
  const user = req.user;
  try {
    const userDb = await User.findOne({ where: { id: user.id } });

    const date = new Date(user.changePasswordDate);
    const miliJwt = date.getTime();

    const dateDb = userDb.changePasswordDate.getTime();

    if (miliJwt !== dateDb) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Password has been change, please login again!',
        data: error
      })
    }
    return next();
  } catch (error) {
    return res.status(401).send({ statusCode: 401, message: 'Password has been change, please login again!!!', data: error })
  }
}
export default verifyPasswordChange;



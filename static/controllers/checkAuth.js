
const jwt = require('jsonwebtoken');









module.exports = (req, res, next) =>{
  try {
      const decoded =jwt.varify(req.body.token, process.env.JWT_SECRET);
      req.userdata =decoded;
      console.log(userdata);
        next();
  } catch (error) {
    return res.status(401).json({
      message: 'You are not Authorised!'
    });

  }


};

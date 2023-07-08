const jwt = require("jsonwebtoken");
const { customCreateSecretKey } = require("../utils/customCreateSecretKey");
const { SetErrorResponse } = require("../utils/responseSetter");
const User = require("../model/user.model");
const Owner = require("../model/owner.model");

exports.checkAuthValidation = async (req, res, next) => {
  try {
    if (!req.cookies?.access_token) {
      throw new SetErrorResponse("Auth Token Not Found", 401);
    }
    const token = req.cookies?.access_token;
    if (token) {
      try {
        const decoding = jwt.decode(token);
        // console.log({ decoding, token });
        if (!decoding) throw new SetErrorResponse("Invalid token");
        let admin = await Owner.findOne({ email: decoding.email });
        if (admin) {
          req.admin = admin;
        }
        let user = await User.findOne({ email: decoding.email });
        if (user) {
          req.user = user;
        }
        if (!admin && !user) {
          throw new SetErrorResponse(`User Not Found:`, 404);
        }

        const data = jwt.verify(token, customCreateSecretKey());
        res.locals.authData = data;
        res.locals.authData.success = true;
      } catch (err) {
        throw new SetErrorResponse(
          `Access Not Granted ! Please Login Again: ${err}`,
          401
        );
      }
    }
    next();
  } catch (err) {
    res.fail(err);
  }
};

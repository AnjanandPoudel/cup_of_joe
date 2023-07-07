const jwt = require("express-jwt");

exports.tokenMaker=async ({secretKey,values,identifier})=>{
    try {
        const token=jwt.sign(
            {
             ...values
            },
            secretKey
          );
          return token
    } catch (error) {
        throw error
    }
}

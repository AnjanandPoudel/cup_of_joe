const jwt = require("jsonwebtoken");

exports.tokenMaker=async ({secretKey,values,identifier})=>{
    try {
        const token=jwt.sign(
            {
             ...values,identifier
            },
            secretKey
          );
          return token
    } catch (error) {
        throw error
    }
}

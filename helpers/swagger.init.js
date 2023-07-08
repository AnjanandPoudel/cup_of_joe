const { Router } = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFiles = require ("./swagger/swagger_output.json") 

const router = Router();

const options = {
  swaggerOptions: {
    authAction: {
      authentication: {
        name: "authentication",
        schema: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "",
        },
        value: "Bearer <JWT>",
      },
    },
  },
};

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFiles));

exports.swaggerInit = () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports=router;

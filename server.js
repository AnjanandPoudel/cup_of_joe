const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const {connectDatabase} = require("./config/db");


// dotenv configure
dotenv.config({
  path: "./config/.env",
});

//routes declaration
const ApiRouter = require("./routes/main.route");
const swaggerRouter = require("./helpers/swagger.init")
const { failCase, successCase } = require("./utils/requestHandler");
const cookieParser = require("cookie-parser");

//database
connectDatabase();



//CORS
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const port = parseInt(process.argv[2]) || process.env.PORT || 3000;
app.set("port", port);

app.use('*',(req,res,next) => {
    res.fail=failCase({req,res})
    res.success=successCase({req,res})
    next()
})


//routes will be here
app.use("/doc", swaggerRouter);

app.use("/api",ApiRouter)

//handle other requests with 404 if not handled previously
app.use("*", (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "Api endpoint not found !!!",
  });
});

exports.appReturn = () => {
  return app;
};

app.listen(port, () => {
  console.log(
    `Server is listening at http: //localhost: ${Date()}`,
    `, PORT ==`,
    port
  );
});

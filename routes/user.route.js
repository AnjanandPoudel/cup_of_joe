const {
  getUsers,
  getUser,
  registerUser,
  loginUser,
} = require("../controller/user.controller");
const {
  checkDuplicateValue,
} = require("../middlewares/checkForDuplicateValues");
const { checkForExistence } = require("../middlewares/checkForExistence");
const { validate, getMethodValidate } = require("../middlewares/validate");
const { validator } = require("../middlewares/validator");
const User = require("../model/user.model");

const router = require("express").Router();

router.get("/", getMethodValidate(), validator, getUsers);
router.get("/:userId", validate(["userId"]), validator, getUser);

router.post(
  "/register",
  validate(["email", "password", "contact", "name"]),
  validator,
  checkDuplicateValue(User, [{ key: "email", value: "body.email" }]),
  registerUser
);

router.post(
  "/login",
  validate(["email", "password"]),
  validator,
  checkForExistence(User, [{ key: "email", value: "body.email" }], "existUser"),
  loginUser
);

module.exports = router;

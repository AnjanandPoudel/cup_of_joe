const {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  logOutUser,
} = require("../controller/user.controller");
const { checkAuthValidation } = require("../middlewares/authentication");
const {
  checkDuplicateValue,
} = require("../middlewares/checkForDuplicateValues");
const { checkForExistence } = require("../middlewares/checkForExistence");
const { isOwner } = require("../middlewares/isUserType");
const { validate, getMethodValidate } = require("../middlewares/validate");
const { validator } = require("../middlewares/validator");
const User = require("../model/user.model");

const router = require("express").Router();

router.get(
  "/",
  checkAuthValidation,
  isOwner,
  getMethodValidate(),
  validator,
  getUsers
);

router.get(
  "/:userId",
  checkAuthValidation,
  validate(["userId"]),
  validator,
  getUser
);

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

router.post("/logout", checkAuthValidation, logOutUser);

module.exports = router;

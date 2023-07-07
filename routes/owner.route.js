
  const { getOwners, getOwner, registerOwner, loginOwner, logOutOwner } = require("../controller/owner.controller");
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
    getOwners
  );
  
  router.get(
    "/:userId",
    checkAuthValidation,
    validate(["userId"]),
    validator,
    getOwner
  );
  
  router.post(
    "/register",
    validate(["email", "password", "contact", "name"]),
    validator,
    checkDuplicateValue(User, [{ key: "email", value: "body.email" }]),
    registerOwner
  );
  
  router.post(
    "/login",
    validate(["email", "password"]),
    validator,
    checkForExistence(User, [{ key: "email", value: "body.email" }], "existUser"),
    loginOwner
  );
  
  router.post("/logout", checkAuthValidation, logOutOwner);
  module.exports = router;
  
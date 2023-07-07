
  const { getOwners, getOwner, registerOwner, loginOwner, logOutOwner } = require("../controller/owner.controller");
const { checkAuthValidation } = require("../middlewares/authentication");
  const {
    checkDuplicateValue,
  } = require("../middlewares/checkForDuplicateValues");
  const { checkForExistence } = require("../middlewares/checkForExistence");
  const { isOwner } = require("../middlewares/isUserType");
  const { validate, getMethodValidate } = require("../middlewares/validate");
  const { validator } = require("../middlewares/validator");
const Owner = require("../model/owner.model");
  
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
    "/:ownerId",
    checkAuthValidation,
    validate(["ownerId"]),
    validator,
    getOwner
  );
  
  router.post(
    "/auth/register",
    validate(["email", "password", "contact", "name"]),
    validator,
    checkDuplicateValue(Owner, [{ key: "email", value: "body.email" }]),
    registerOwner
  );
  
  router.post(
    "/auth/login",
    validate(["email", "password"]),
    validator,
    checkForExistence(Owner, [{ key: "email", value: "body.email" }], "existOwner"),
    loginOwner
  );
  
  router.post("/auth/logout", checkAuthValidation, logOutOwner);
  module.exports = router;
  
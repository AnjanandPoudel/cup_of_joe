const {
  getCafeController,
  getCafesController,
  postCafeController,
  patchCafeController,
} = require("../controller/cafe.controller");
const { checkAuthValidation } = require("../middlewares/authentication");
const { isOwner, isUser } = require("../middlewares/isUserType");
const { validate, getMethodValidate, validateOpt } = require("../middlewares/validate");
const { validator } = require("../middlewares/validator");

const router = require("express").Router({ mergeParams: true });
const coffeeOrderRouter = require("./coffeeOrder.route");

router.get("/", getMethodValidate(), validator, getCafesController);
router.get("/:cafeId", validate(["cafeId"]), validator, getCafeController);

router.post(
  "/",
  validate(["location","available"]),
  validator,
  checkAuthValidation,
  isOwner,
  postCafeController
);

router.patch(
  "/:cafeId",
  validate(["cafeId"]),
  validateOpt(["location", "available"]),
  validator,
  checkAuthValidation,
  isOwner,
  patchCafeController
);

router.use(
  "/:cafeId",
  validate(["cafeId"]),
  validator,
  checkAuthValidation,
  coffeeOrderRouter
);

module.exports = router;

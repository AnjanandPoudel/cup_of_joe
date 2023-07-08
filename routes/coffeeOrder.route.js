const {
  getYourCoffeeOrdersController,
  postCoffeeOrderController,
  patchCoffeeOrderController,
  deleteCoffeeOrderController,
  getCoffeeOrderController,
} = require("../controller/coffeeOrder.controller");
const { checkAuthValidation } = require("../middlewares/authentication");
const { isOwner, isUser } = require("../middlewares/isUserType");
const {
  getMethodValidate,
  validate,
  validateOpt,
} = require("../middlewares/validate");
const { validator } = require("../middlewares/validator");

const router = require("express").Router({ mergeParams: true });

router.get(
  "/",
  getMethodValidate(),
  validator,
  isUser,
  getYourCoffeeOrdersController
);
router.get(
  "/:coffeeOrderId",
  validate(["coffeeOrderId"]),
  validator,
  getCoffeeOrderController
);

router.post(
  "/",
  validate(["quantity", "typeOfCoffee", "extraRequest", "extraSugar"]),
  validator,
  isUser,
  postCoffeeOrderController
);

router.patch(
  "/:coffeeOrderId",
  validate(["coffeeOrderId"]),
  validateOpt(["orderStatus"]),
  validator,
  isOwner,
  patchCoffeeOrderController
);

router.delete(
  "/:coffeeOrderId",
  validate(["coffeeOrderId"]),
  validator,
  isOwner,
  deleteCoffeeOrderController
);

module.exports = router;

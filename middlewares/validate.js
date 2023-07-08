const { check ,query} = require("express-validator");
const { typeOfCoffee, extraSugar, orderStatus } = require("../utils/constants");

exports.getMethodValidate = () => {
  try {
    let result = [];
    let params = ["page", "limit", "sort"];
    params.forEach((param) => {
      switch (param) {
        case "sort":
          result.push(
            query("sort", "sort not valid")
              .optional()
              .isString()
              .isLength({ min: 3, max: 30 })
          );
          break;

        case "limit":
          result.push(
            query("limit", "limit must be positive number")
              .optional()
              .customSanitizer((data) => data || 1)
              .isInt({ gt: 0 })
              .toInt()
          );
          break;

        case "page":
          result.push(
            query("page", "Page must be positive number")
              .optional()
              .customSanitizer((data) => data || 0)
              .isInt({ gt: -1 })
              .toInt()
          );
          break;
      }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.validate = (params) => {
  try {
    const result = [];
    params.forEach((element) => {
      switch (element) {

        case "email":
          result.push(
            check(
              "email",
              "Email should be between 5 to 50 characters and proper Email"
            )
              .notEmpty()
              .isLength({ min: 5, max: 50 })
              .isEmail()
              .normalizeEmail()
          );
          break;

        case "password":
          result.push(
            check(
              "password",
              "password should be more than 8 character but less than 30 char"
            )
              .notEmpty()
              .isString()
              .withMessage("Password should be in string form")
              .isLength({ min: 8, max: 30 })
          );
          break;

        case "name":
          result.push(
            check(
              "name",
              "Name should be between 2 to 50 characters and it should be string"
            )
              .notEmpty()
              .isLength({ min: 2, max: 50 })
              .isString()
          );
          break;

        case "location":
          result.push(
            check(
              "location",
              "location should be between 2 to 50 characters and it should be string"
            )
              .notEmpty()
              .isLength({ min: 2, max: 50 })
              .isString()
          );
          break;

        case "available":
          result.push(
            check(
              "available",
              "available should be Boolean"
            )
              .notEmpty()
              .isBoolean()
          );
          break;

        case "address":
          result.push(
            check(
              "address",
              "Address should be between 5 to 50 characters and it should be string"
            )
              .notEmpty()
              .isLength({ min: 5, max: 50 })
              .isString()
          );
          break;

        case "extraRequest":
          result.push(
            check(
              "extraRequest",
              "extraRequest should be between 2 to 100 characters and it should be string"
            )
              .isLength({ min: 2, max: 100 })
              .isString()
              .optional()
          );
          break;

        case "contact":
          result.push(
            check("contact", "contact not Valid, (Should be Mobile phone number)")
              .notEmpty()
              .isLength({ min: 7, max: 15 })
              .isMobilePhone("ne-NP")
          );
          break;

          case "typeOfCoffee":
            result.push(
              check("typeOfCoffee", "typeOfCoffee is Invalid (Enum) ")
                .notEmpty()
                .isLength({ min: 3, max: 40 })
                .isString()
                .custom((data) => Object.values(typeOfCoffee).includes(data))
            );
            break;

          case "extraSugar":
            result.push(
              check("extraSugar", "extraSugar is Invalid (Enum) ")
                .notEmpty()
                .isLength({ min: 1, max: 20 })
                .isString()
                .custom((data) => Object.values(extraSugar).includes(data))
            );
            break;

            case "userId":
              result.push(
                check("userId", "userId should be a mongoId and not Empty")
                  .notEmpty()
                  .isLength({ min: 5, max: 50 })
                  .isMongoId()
              );
              break;
     
            case "ownerId":
              result.push(
                check("userId", "userId should be a mongoId and not Empty")
                  .notEmpty()
                  .isLength({ min: 5, max: 50 })
                  .isMongoId()
              );
              break;
     
            case "cafeId":
              result.push(
                check("cafeId", "cafeId should be a mongoId and not Empty")
                  .notEmpty()
                  .isLength({ min: 5, max: 50 })
                  .isMongoId()
              );
              break;

            case "coffeeOrderId":
              result.push(
                check("coffeeOrderId", "coffeeOrderId should be a mongoId and not Empty")
                  .notEmpty()
                  .isLength({ min: 5, max: 50 })
                  .isMongoId()
              );
              break;

            case "quantity":
              result.push(
                check("quantity", "Quantity is Invalid ")
                  .notEmpty()
                  .isNumeric()
                  .isInt({ min: 0})
              );
              break;
     
      }
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};


exports.validateOpt = (params) => {
  try {
    const result = [];
    params.forEach((element) => {
      switch (element) {


        case "contact":
          result.push(
            check("contact", "contact not Valid, (Should be Mobile phone number)")
              .optional()
              .isLength({ min: 7, max: 15 })
              .isMobilePhone("ne-NP")
          );
          break;

        case "name":
          result.push(
            check(
              "name",
              "Name should be between 2 to 50 characters and it should be string"
            )
              .optional()
              .isLength({ min: 2, max: 50 })
              .isString()
          );
          break;

        case "location":
          result.push(
            check(
              "location",
              "location should be between 2 to 50 characters and it should be string"
            )
              .optional()
              .isLength({ min: 2, max: 50 })
              .isString()
          );
          break;

        case "available":
          result.push(
            check(
              "available",
              "available should be Boolean"
            )
              .optional()
              .isBoolean()
          );
          break;

          case "orderStatus":
            result.push(
              check("orderStatus", "orderStatus is Invalid (Enum) ")
                .optional()
                .isLength({ min: 1, max: 40 })
                .isString()
                .custom((data) => Object.values(orderStatus).includes(data))
            );
            break;

            case "quantity":
              result.push(
                check("quantity", "Quantity is Invalid ")
                  .optional()
                  .isNumeric()
                  .isInt({ min: 0})
              );
              break;
       
      }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

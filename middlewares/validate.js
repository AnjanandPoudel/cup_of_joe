const { check ,query} = require("express-validator");

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
        case "task":
          result.push(
            check("task", "Task is Invalid")
              .notEmpty()
              .isString()
              .isLength({ min: 2, max: 100 })
              .withMessage("Task should be between 2 and 100 characters")
          );
          break;
        case "status":
          result.push(
            check("status", "Status is Invalid")
              .notEmpty()
              .custom((data) => {
                if (Object.values(STATUS).includes(data)) {
                  return true;
                }
                return false;
              })
          );
          break;

        case "todoId":
          result.push(
            check("todoId", "todoId should be MongoId").notEmpty().isMongoId()
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
        case "task":
          result.push(
            check("task", "Task is Invalid")
              .optional()
              .isString()
              .isLength({ min: 2, max: 100 })
              .withMessage("Task should be between 2 and 100 characters")
          );
          break;
        case "status":
          result.push(
            check("status", "Status is Invalid")
              .optional()
              .custom((data) => {
                if (Object.values(STATUS).includes(data)) {
                  return true;
                }
                return false;
              })
          );
          break;
      }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

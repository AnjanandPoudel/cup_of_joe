const { SetErrorResponse } = require("../utils/responseSetter");

exports.checkDuplicateValue = (model, queries) => {
  const returnFunc = async (req, res, next) => {
    try {
      const getQuery = () => {
        const returningData = {};
        queries.forEach((query) => {
          const { key, value } = query;
          const values = value.split(".");
          returningData[key] = values?.reduce((prev, current) => {
            return prev[current]; //req.body.email
          }, req);
        });
        return returningData;
      };
      const valueToCheck = getQuery();
      const valueChecked = await model.findOne(valueToCheck);
      if (valueChecked) {
        throw new SetErrorResponse(
          `${[Object.keys(valueToCheck)]} already exist`,
          403
        );
      }
      next();
    } catch (err) {
      return res.fail(err);
    }
  };
  return [returnFunc];
};


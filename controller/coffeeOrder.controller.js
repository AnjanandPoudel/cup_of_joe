const CoffeeOrder = require("../model/coffeeOrder.model");
const { getPaginatedData } = require("../utils/pagination");
const { SetErrorResponse } = require("../utils/responseSetter");

exports.getYourCoffeeOrdersController = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const userId= req.user?._id
    const data = await getPaginatedData(CoffeeOrder, {
      pagination: true,
      query: {user:userId},
      lean: true,
      limit: limit,
      page: page,
      modFunction: (data) => {
        return data;
      },
    });
    res.success(data);
  } catch (e) {
    res.fail(e);
  }
};

exports.getCoffeeOrderController = async (req, res) => {
  try {
    const { coffeeOrderId } = req.params;
    const data = await CoffeeOrder.findOne({ _id: coffeeOrderId });
    res.success(data);
  } catch (e) {
    res.fail(e);
  }
};

exports.postCoffeeOrderController = async (req, res) => {
  try {
    //we already checked for authentication and middleware that, it is user who is posting order for coffee

    const { cafeId } = req.params;
    const { quantity, typeOfCoffee, extraRequest, extraSugar } = req.body;

    const data = await new CoffeeOrder({
      cafe: cafeId,
      user: req.user?._id,
      quantity,
      typeOfCoffee,
      extraRequest,
      extraSugar,
      orderStatus: "pending",
    }).save();

    res.success(data);
  } catch (e) {
    res.fail(e);
  }
};

//! Only for Owners

exports.patchCoffeeOrderController = async (req, res) => {
  try {
    //we already checked for authentication and middleware that, it is owner who is posting order for coffee

    const { cafeId, coffeeOrderId } = req.params;
    const { orderStatus } = req.body;

    const data = await CoffeeOrder.findOneAndUpdate(
      { cafe: cafeId, _id: coffeeOrderId },
      {
        orderStatus: orderStatus,
      }
    ); // you can also use {new:true} for immediate update and to send data back to the client

    if (!data) {
      throw new SetErrorResponse();
    }

    res.success("Request Updated");
  } catch (e) {
    res.fail(e);
  }
};

exports.deleteCoffeeOrderController = async (req, res) => {
  try {
    //we already checked for authentication and middleware that, it is owner/admin who is accessing this

    const { cafeId, coffeeOrderId } = req.params;
    const data = await CoffeeOrder.findOneAndDelete({
      cafe: cafeId,
      _id: coffeeOrderId,
    });

    if (!data) {
      throw new SetErrorResponse();
    }

    res.success("Order Deleted !");
  } catch (e) {
    res.fail(e);
  }
};

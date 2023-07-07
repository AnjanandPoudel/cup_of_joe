const Cafe = require("../model/cafe.model");
const { getPaginatedData } = require("../utils/pagination");
const { SetErrorResponse } = require("../utils/responseSetter");

exports.getCafesController = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const data = await getPaginatedData(Cafe, {
      pagination: true,
      query: {},
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

exports.getCafeController = async (req, res) => {
  try {
    const { cafeId } = req.params;
    const data = await Cafe.findOne({ _id: cafeId });
    res.success(data);
  } catch (e) {
    res.fail(e);
  }
};

//! Only for Owners
exports.postCafeController = async (req, res) => {
  try {
    const { location, available } = req.body;
    const data = await new Cafe({
      location,
      available,
      owner: ownerId,
    }).save();

    res.success(data);
  } catch (e) {
    res.fail(e);
  }
};

exports.patchCafeController = async (req, res) => {
  try {
    //From middleware only owner can use it
    const { cafeId } = req.params;

    const data = await Cafe.findOneAndUpdate(
      { _id: cafeId },
      {
        location,
        available,
      }
    ); // you can also use {new:true} for immediate update and to send data back to the client

    if (!data) {
      throw new SetErrorResponse();
    }

    res.success("Edited Successfully");
  } catch (e) {
    res.fail(e);
  }
};

exports.deleteCafeController = async (req, res) => {
  try {
    const { cafeId } = req.params;
    const data = await Cafe.findOneAndDelete({
      _id: cafeId,
    });

    if (!data) {
      throw new SetErrorResponse();
    }

    res.success("Cafe Deleted !");
  } catch (e) {
    res.fail(e);
  }
};

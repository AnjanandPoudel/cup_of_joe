const Owner = require("../model/owner.model");
const jwt = require("express-jwt");
const { getPaginatedData } = require("../utils/pagination");
const { customCreateSecretKey } = require("../utils/customCreateSecretKey");
const { SetErrorResponse } = require("../utils/responseSetter");
const { tokenMaker } = require("../utils/tokenMaker");

exports.getOwners = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const data = await getPaginatedData(Owner, {
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

exports.getOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const data = await Owner.findOne({ _id: ownerId });
    res.success(data);
  } catch (e) {
    res.fail(e);
  }
};

exports.registerOwner = async (req, res) => {
  try {
    const { name, contact, password, email } = req.body;


    const data = await new Owner({
      name: name,
      contact,
      password,
      email,
    }).save();

    if (!data) {
      throw new SetErrorResponse("Something went wrong", 500);
    }

    res.success(data);
  } catch (e) {
    res.fail(e);
  }
};

exports.loginOwner = async (req, res) => {
  try {
    const secretKey = customCreateSecretKey();
    const { password, email } = req.body;
    
    const data= await Owner.findOne({email:email},"+salt +hashed_password")

    if (!data?.authentication(password)) {
      return res.json({ error: `Password Did Not Matched` }).status(401);
    }

    const token =await tokenMaker({
      secretKey,
      values: {
        _id: data._id,
        name: data?.name,
        email,
        contact: data?.contact
      },
      identifier: "login",
    });

    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({ message: "Logged in successfully !!",token });
  } catch (e) {
    res.fail(e);
  }
};

exports.logOutOwner = async (req, res) => {
  try {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged Out!!" });
  } catch (e) {
    res.fail(e);
  }
};

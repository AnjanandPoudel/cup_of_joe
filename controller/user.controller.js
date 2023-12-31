const User = require("../model/user.model");
const jwt = require("express-jwt");
const { getPaginatedData } = require("../utils/pagination");
const { customCreateSecretKey } = require("../utils/customCreateSecretKey");
const { SetErrorResponse } = require("../utils/responseSetter");
const { tokenMaker } = require("../utils/tokenMaker");

exports.getUsers = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const data = await getPaginatedData(User, {
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

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await User.findOne({ _id: userId });
    res.success(data);
  } catch (e) {
    res.fail(e);
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, contact, password, email,address } = req.body;

    const data = await new User({
      name: name,
      contact,
      password,
      email,
      address
    }).save();

    if (!data) {
      throw new SetErrorResponse("Something went wrong", 500);
    }

    res.success(data);
  } catch (e) {
    res.fail(e);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const secretKey = customCreateSecretKey();
    const { password, email } = req.body;
    const data= await User.findOne({email:email},"+salt +hashed_password")
    if (!data.authentication(password)) {
      return res.json({ error: `Password Did Not Matched` }).status(401);
    }

    const token =await tokenMaker({
      secretKey,
      values: {
        _id: data._id,
        name: data?.name,
        email,
        contact: data?.contact,
      },
      identifier: "login",
    });

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Logged in successfully !!",token });
  } catch (e) {
    res.fail(e);
  }
};

exports.logOutUser = async (req, res) => {
  try {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged Out!!" });
  } catch (e) {
    res.fail(e);
  }
};

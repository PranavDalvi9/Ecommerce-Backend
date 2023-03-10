const usermodel = require('../models/user_model.js')
const bcryptjs = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const {  uuidv4 } = require('uuid')

const error = (tag, key) => {
  if (tag === 1) return "Invalid Request";
  if (tag === 2) return `Invalid ${key}`;
  if (tag === 3) return `${key} already exist`;
  if (tag === 4) return `User not found`;
};

const signUp = async (req, res) => {
  try {
    const body = req.body;
    if (!body.email || !body.password || !body.authType || !body.fullName)
      return res.status(400).send({ message: error(1), data: {} });
    const email = validator.isEmail(body.email);
    if (!email)
      return res.status(400).send({ message: error(2, "email"), data: {} });
    const emailExist = await usermodel.findOne({
      email: { $regex: body.email, $options: "i" },
    });
    if (emailExist)
      return res.status(400).send({ message: error(3, "Email"), data: {} });
    const password = await bcryptjs.hash(body.password, 10);
    if (!["GOOGLE", "FACEBOOK", "PORTAL"].includes(body.authType))
      return res.status(400).send({ message: error(2, "auth_type"), data: {} });
    if (body.uid) {
      const uidExist = await usermodel.findOne({ uid: body.uid });
      if (uidExist)
        return res.status(400).send({ message: error(3, "Uid"), data: {} });
    }
    const data = {
      email: body.email.toLowerCase(),
      password: password,
      fcm_token: body.fcmToken,
      profile_pic: body.profilePic,
      auth_type: body.authType,
      full_name: body.fullName,
      uuid: body.authType === "PORTAL" ? uuidv4() : body.uid,
    };

    const response = await usermodel.create(data);

    return res
      .status(201)
      .send({ message: "Account created successfully", data: response });
  } catch (error) {
    res.send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const body = req.body;
    if (!body.email || !body.password)
      return res.status(400).send({ message: error(1), data: {} });
    const emailExist = await usermodel.findOne({
      email: { $regex: body.email, $options: "i" },
    });
    if (!emailExist)
      return res.status(404).send({ message: error(4), data: {} });
    const userExist = await bcryptjs.compare(
      body.password,
      emailExist.password
    );
    if (!userExist)
      return res.status(400).send({ message: error(2, "password"), data: {} });
    const response = {
      _id: emailExist._id,
      full_name: emailExist.full_name,
      email: emailExist.email,
      image: emailExist.profile_pic,
      uuid: emailExist.uuid
    };
    if (emailExist.auth_type === "PORTAL") {
      const token = jwt.sign(
        {
          userId: emailExist._id,
        },
        process.env.SECRET_KEY
      );
      res.setHeader("token", token);
      response["token"] = token;
    }
    await usermodel.updateOne(
      {
        _id: emailExist._id,
      },
      { fcm_token: body.fcm_token }
    );
    return res
      .status(200)
      .send({ message: "User logined successfully", data: response });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { signUp, login };

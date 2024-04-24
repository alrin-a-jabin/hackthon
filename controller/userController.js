import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/Users.js";

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "User does not exist",
      });
    }
    console.log(password, user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Password is incorrect",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({ user: user, token: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

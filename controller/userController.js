import { UserModel } from "../models/Users";
import generateToken from "../utils/generateToken";
import bcrypt from "bcryptjs";

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: 'User does not exist',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: 'Password is incorrect'
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({ user: user, token: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

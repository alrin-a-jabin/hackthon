// import { UserModel } from "../models/Users.js";
// import jsonwebtoken from "jsonwebtoken";

// export const tokenVerification = async (req, res, next) => {
//   const authHeader = req.headers.token;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jsonwebtoken.verify(
//       token,
//       "sdkjbjdgfkjsbfgjkbsdkjgfkjsbgkjfsbgkjbfskjgbksfjbg",
//       async (err, user) => {
//         if (err) res.status(403).json("Token is not valid");
//         req.user = await User.UserModel(user.id).select('-password')

//         next()

//         let userInfo = await UserModel.findOne({ _id: user._id });
//         if (userInfo.token == token) {
//           req.user = await userInfo.getPublicProfile();
//           next();
//         } else {
//           res.status(403).json("Token is not valid with your details");
//         }
//       }
//     );
//   } else {
//     res.status(401).json("You are not authenticated");
//   }
// };

import jsonwebtoken from "jsonwebtoken";
import { UserModel } from "../models/Users.js";
export const tokenVerification = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jsonwebtoken.verify(
        token,
        "sdkjbjdgfkjsbfgjkbsdkjgfkjsbgkjfsbgkjbfskjgbksfjbg"
      );
      req.user = await UserModel.findById(decoded.id);
      next();
    } catch (error) {
      res.status(401).json(error.message);
    }
  }

  if (!token) {
    res.status(401).json("You are not authenticated");
  }
};

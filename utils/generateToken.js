import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, 'sdkjbjdgfkjsbfgjkbsdkjgfkjsbgkjfsbgkjbfskjgbksfjbg', {
    expiresIn: '30d'
  });
};

export default generateToken;

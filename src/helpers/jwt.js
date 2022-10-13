import jwt from "jsonwebtoken";

const sign = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
    algorithm: "HS256",
  });
  return token;
};

const verify = (token) => {
  const data = jwt.verify(token, process.env.JWT_SECRET, {
    algorithm: "HS256",
  });
  return data;
};

const refreshSign = (data) => {
  const token = jwt.sign(data, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES,
    algorithm: "HS256",
  });
  return token;
};

const refreshVerify = (token) => {
  const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
    algorithm: "HS256",
  });
  return data;
};

export default {
  sign,
  verify,
  refreshSign,
  refreshVerify,
};

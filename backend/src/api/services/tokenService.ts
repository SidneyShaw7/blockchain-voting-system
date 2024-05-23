import jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.JWT_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

if (!accessTokenSecret || !refreshTokenSecret) {
  throw new Error('JWT_SECRET and REFRESH_TOKEN_SECRET must be defined in the environment variables.');
}

// console.log('Access Token Secret:', accessTokenSecret);
// console.log('Refresh Token Secret:', refreshTokenSecret);

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, accessTokenSecret, { expiresIn: '1h' });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, refreshTokenSecret, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessTokenSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshTokenSecret);
};

/* eslint consistent-return: 0 */

const { verifyToken } = require('../lib/token');

exports.isAuthenticated = (req, res, next) => {
  // 토큰 취득
  const token = req.body.token || req.query.token || req.headers.authorization;
  // const token = req.body.token || req.query.token || req.headers.authorization.split(' ')[1];
  console.log('token:', token);

  // 토큰 미존재: 로그인하지 않은 사용자
  if (!token) {
    return res.status(403).json({ success: false, message: 'token is not exist' });
  }

  // 토큰 검증
  verifyToken(token)
    .then(_decodedToken => {
      next();
    })
    .catch(err => res.status(403).json({ success: false, message: err.message }));
};

const jwt = require('jsonwebtoken');

// JWT 토큰 생성
exports.createToken = payload => {
  // https://github.com/auth0/node-jsonwebtoken
  // algorithm (default: HS256)
  // expiresIn: expressed in seconds or a string describing a time span zeit/ms.
  // Eg: 60, "2 days", "10h", "7d".
  // A numeric value is interpreted as a seconds count.
  // If you use a string be sure you provide the time units (days, hours, etc),
  // otherwise milliseconds unit is used by default ("120" is equal to "120ms").

  const jwtOption = {
    expiresIn: '7d'
  };

  return new Promise((resolve, reject) => {
    // 사용법: jwt.sign(payload, secret, options, [callback])
    // - 만약에 네 번째 파라미터인 callback이 전달되면 비동기적으로 작동하며
    // 콜백함수의 파라미터는 (err, token) 입니다.
    // - callback이 전달되지 않을시엔 동기적으로 작동하며 JWT를 문자열 형태로 리턴합니다.
    // - payload는 객체, buffer, 문자열형태로 전달 될 수있습니다.
    // - secret은 서명을 만들 때 사용되는 알고리즘에서 사용되는 문자열 혹은 buffer 형태의 값 입니다.

    jwt.sign(payload, process.env.JWT_SECRET, jwtOption, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
};

// JWT 토큰 검증
exports.verifyToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      console.log('ERROR:', error);
      reject(error);
    }
    resolve(decoded);
  });
});

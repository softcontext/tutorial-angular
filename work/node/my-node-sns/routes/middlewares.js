/**
 * 패스포트는 req 객체에 다음 메소드를 추가한다.
 * - req.isAuthenticated() ==> 로그인 여부를 반환한다.
 * - req.login()  ==> passport.serializeUser() ==> req.session.passport.user 정보를 추가한다.
 *   ==> req.session.destroy() 코드로 제거한다.
 * - req.logout() ==> req.user 정보를 제거한다.
 */

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error', 'Fail: login is required');
    res.redirect('/');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    req.flash('error', 'Fail: you are already logged in');
    res.redirect('/');
  }
};

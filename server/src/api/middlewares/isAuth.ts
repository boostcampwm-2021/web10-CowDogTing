export const isLoggedIn = (req, res, next) => {
  console.log("1");
  /*if (req.isAuthentiated()) {
    // console.log(req.session.uid);
    console.log("2");
    next();
  } else {
    console.log("1");
    next();
  }*/
  next();
};

export const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다");
    // res.redirect(`/error=${message}`);
  }
};

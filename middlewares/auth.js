const loggedIn = (req, res, next) => {
  // if (!req.session.userId) {
  //   const error = `Please login to access this page`;
  //   return res.redirect(`/user/login?error=${error}`);
  // }
  next();
}

const errorNotFound = (req, res, next) => {
  res.status(404).render('notfound');
}

module.exports = {loggedIn, errorNotFound}
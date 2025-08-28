const loggedIn = (req, res, next) => {
  if (!req.session.userId) {
    const error = `Please login to access this page`;
    return res.redirect(`/user/login?error=${error}`);
  }
  next();
}

const isDoctor = (req, res, next) => {
  if (req.session.role !== "Doctor") {
    const UserId = req.session.userId
    const error = `You have no access to this page!`;
    return res.redirect(`/patient/${UserId}?error=${error}`);
  }
  next();
}

const isPatient = (req, res, next) => {
  if (req.session.role !== "Patient") {
    const UserId = req.session.userId
    const error = `You have no access to this page!`;
    return res.redirect(`/doctor/${UserId}?error=${error}`);
  }
  next();
}

const errorNotFound = (req, res, next) => {
  res.status(404).render('notfound');
}

module.exports = {loggedIn, errorNotFound, isDoctor, isPatient}
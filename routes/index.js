var express = require("express");
var router = express.Router();

const postModel = require("./posts");
const userModel = require("./users");
const { use } = require("passport");
const passport = require("passport");

const localStrategy = require("passport-local");
passport.authenticate(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Profile route
router.get("/profile", isLoggedIn, function (req, res, next) {
  res.render("profile");
});

// Registration
router.post("/register", function (req, res) {
  const userdData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
  });

  userModel.register(userdData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

// Login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: ".profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

//Logout
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// isLoggedIn Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}
module.exports = router;

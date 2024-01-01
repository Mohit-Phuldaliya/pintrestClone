var express = require("express");
var router = express.Router();

const postModel = require("./posts");
const userModel = require("./users");
const { use } = require("passport");
const passport = require("passport");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page or Register Page */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Login page
router.get("/login", function (req, res, next) {
  res.render("login");
});

//Profile route
router.get("/profile", isLoggedIn, function (req, res, next) {
  res.render("profile");
});

//feed
router.get("/feed", function (req, res, next) {
  res.render("feed");
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
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

//Logout
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

// isLoggedIn Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
module.exports = router;

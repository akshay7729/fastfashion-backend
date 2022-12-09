const LocalStrategy = require("passport-local").Strategy;
const bycrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const UserModal = require("../src/models/userModel");

function initialize(passport, getUserByEmail, getUserById) {
  // authenticate user
  // const authenticateUser = async (email, password, done) => {
  //   console.log("login progress till here", email, password);
  //   const user = getUserByEmail(email);
  //   if (user === null) {
  //     return done(null, false, { message: "No user with that email found" });
  //   }

  //   try {
  //     if (await bycrypt.compare(password, user.password)) {
  //       return done(null, user);
  //     } else {
  //       return done(null, false, { message: "Password is incorrect" });
  //     }
  //   } catch (error) {
  //     return done(error);
  //   }
  // };

  // create local strategy
  // passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.use(
    new LocalStrategy(function (username, password, done) {
      (async () => {
        const query = UserModal.find();
        query instanceof mongoose.Query;
        const docs = await query;

        const getUser = docs.find((user) => user.userName === username);
        console.log("getUser", getUser);

        if (!getUser) {
          return done(null, false);
        }

        console.log("user exists");

        bycrypt.compare(password, getUser.password, (err, user) => {
          if (err) throw err;
          if (user === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });

        return docs;
      })();

      // UserModal.findOne({ username: username }, function (err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     return done(null, false);
      //   }

      //   bycrypt.compare(password, user.password, (err, result) => {
      //     if (err) throw err;
      //     if (result === true) {
      //       return done(null, user);
      //     } else {
      //       return done(null, false);
      //     }
      //   });

      //   // if (!user.verifyPassword(password)) {
      //   //   return done(null, false);
      //   // }
      // });
    })
  );

  // serialize user
  passport.serializeUser((user, done) => done(null, user.id));

  // deserialize user
  passport.deserializeUser((id, done) => {
    UserModal.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = initialize;

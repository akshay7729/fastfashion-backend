const LocalStrategy = require("passport-local").Strategy;
const bycrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const UserModal = require("../src/models/userModel");

function initialize(passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      (async () => {
        const query = UserModal.find();
        query instanceof mongoose.Query;
        const docs = await query;

        const getUser = docs.find((user) => user.userName === username);

        if (!getUser) {
          return done(null, false);
        }

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

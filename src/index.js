require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const initializePassport = require("./passport.config");
const connectionURL = process.env.MONGOCONNECTIONURL;
const passport = require("passport");
const UserModal = require("./models/userModel");
const flash = require("express-flash");
const session = require("express-session");

const UserRouter = require("./Routers");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(
  session({
    secret: process.env.SESSION_SECRET_ID,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);
app.use(flash());

app.use(cors());
app.use(express.json());
app.use(UserRouter);

app.use("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(400).send(err);
    }

    if (!user) {
      return res.send("No user exists");
    }
    return res.status(200).send({
      message: "Logged In successfully",
    });
  })(req, res, next);
});

const getUserByEmail = async (email) => {
  const getAllUsers = await UserModal.find({});
  return getAllUsers.find((user) => user.email === email);
};

const getUserById = async (id) => {
  const getAllUsers = await UserModal.find({});
  return getAllUsers.find((user) => user.id === id);
};

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

async function startServer() {
  apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

mongoose.connect(connectionURL).then(() => {
  console.log("Mongo DB connection successful");
  startServer();
});

app.listen(PORT, () => {
  console.log("Server is up", PORT);
});

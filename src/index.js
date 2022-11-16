require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");

const connectionURL = process.env.MONGOCONNECTIONURL;

const UserRouter = require("./Routers");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(UserRouter);

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

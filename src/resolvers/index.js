const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const ProductModel = require("../models/productsModel");

const resolvers = {
  Query: {
    greeting: (parent, args, ctx, info) => {
      return args.name ? `Hello ${args.name}` : "Hello";
    },
    user: async (parent, { id, phoneNumber }, ctx, info) => {
      const query = UserModel.find();
      query instanceof mongoose.Query;
      const docs = await query;
      const getUser = docs.find(
        (user) => user.id === id && user.phone === phoneNumber && user
      );

      console.log("getUser", getUser);

      return {
        id: getUser.id,
        firstName: getUser.firstName,
        lastName: getUser.lastName,
        email: getUser.email,
        phoneNumber: getUser.phone,
        userName: getUser.userName,
        password: getUser.password,
      };
    },
    users: async (parent, args, ctx, info) => {
      const query = UserModel.find();
      query instanceof mongoose.Query;
      const docs = await query;

      return docs;
    },

    products: async (parent, { id }, ctx, info) => {
      const query = ProductModel.find({});
      query instanceof mongoose.Query;
      const docs = await query;
      return docs;
    },
  },
  Mutation: {
    createUser: (parent, args, ctx, info) => {
      const newUser = new UserModel(args);
      return newUser.save();
    },
  },
};

module.exports = resolvers;

const mongoose = require("mongoose");
const UserModel = require("../models/userModel");

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
      };
    },
  },
};

module.exports = resolvers;

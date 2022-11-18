const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    greeting(name: String): String
    user(id: Float, phoneNumber: Float): User!
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    phoneNumber: Float
  }
`;

module.exports = typeDefs;

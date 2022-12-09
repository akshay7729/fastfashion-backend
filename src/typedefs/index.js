const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    greeting(name: String): String
    user(id: Float, phoneNumber: Float): User!
    users: [User!]
    products(id: Float): [Products!]
  }

  type Mutation {
    createUser(
      id: Float
      firstName: String
      lastName: String
      phone: Float
      email: String
      userName: String
      password: String
    ): User!
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    userName: String
    email: String
    password: String
    phoneNumber: Float
  }

  type Products {
    id: ID
    title: String
    price: Float
    description: String
    category: String
    image: String
    rating: Rating
  }

  type Rating {
    rate: Float
    count: Float
  }
`;

module.exports = typeDefs;

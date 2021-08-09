// Import gql to provide type definitions

const { gql } = require('apollo-server-express');

const typeDefs = gql`
# Define schema types
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
}

type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID
    user: User
}

# Query types
type Query {
    me: User
    users: [User]
}

# Mutation types
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookDetails: BookInput): User
    removeBook(bookId: String!): User
}

# Input type 
input BookInput {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
}
`;

module.exports = typeDefs;
// Import dependencies and db connection
const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

 // Sets up express server
const app = express();
const PORT = process.env.PORT || 3001;

// Implement the apollo server with the GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// Apply it to the Express server as middleware
server.applyMiddleware({ app });

// Sets up data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Set up a wildcard route on our server that will serve the front end whenever a request for a non-API route is received
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

/**
 * A GraphQL template
 * More Information: https://graphql.org/
 */

/**
 * Importing some libraries
 */

require('dotenv/config');
const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, MONGO_DBNAME, TOKEN_SALT } = process.env;

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect(
  `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${MONGO_DBNAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const db = mongoose.connection;

// create an apollo server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ],
  context: (({ req }) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
        
    try {
      const decodedToken = jwt.verify(req.headers['authorization'].split(' ')[1], TOKEN_SALT);
      return decodedToken
    } catch (err) {
      return { userId: undefined }
    }
  })
});

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('database connected')
  server
    .listen({
      port: process.env.PORT || process.env.GRAPHQL_PORT || 4000
    })
    .then(({ url }) => {
      console.log(`Server started at ${url}`);
    });
})

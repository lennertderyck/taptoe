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
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { authenticationDirectiveSchema } = require('./resolvers/directives');
const { Role } = require('./mongo');

mongoose.connect(
  `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${MONGO_DBNAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const db = mongoose.connection;
let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// create an apollo server instance
const server = new ApolloServer({
  introspection: true,
  playground: true,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ],
  schema: authenticationDirectiveSchema(schema, 'auth'),
  context: (async ({ req }) => {
    try {
      // Check for authentication header
      const authHeader = req.headers['authorization'];
      if (!authHeader) return null;
      
      // Check for token
      const token = authHeader.split(' ')[1];
      if (!token) return null;
      
      // Verify token
      const decodedToken = jwt.verify(token, TOKEN_SALT);
      if (!decodedToken) return null;
      
      // Get current role config of the user
      const roleConfig = await Role.findOne({ name: decodedToken.role }).populate('includes');
      
      // Check if role was found
      if (!roleConfig) return null;
  
      return {
        ...decodedToken,
        roleConfig,
      }
    } catch (error) {
      return null
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

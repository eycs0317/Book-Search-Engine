const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');


const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');




async function startApolloServer(typeDefs, resolvers){

  const PORT = process.env.PORT || 3001;
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();



  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // app.use(routes);

  if (process.env.NODE_ENV === 'production') {
    console.log('in production build')
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
  server.applyMiddleware({ app });
  // app.use(routes)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  await new Promise(resolve => app.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
}
startApolloServer(typeDefs, resolvers )

// await apolloServer.start();






// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//   });
// });

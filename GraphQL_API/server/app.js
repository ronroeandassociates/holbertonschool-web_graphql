// Set up Express.js server listening at port 4000
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();


// Set up GraphQL server at /graphql endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, ()=> {
  console.log('Now listening for requests on port 4000')
});

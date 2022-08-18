// Set up Express.js server listening at port 4000
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
// const schema = require('./schema/schema_orig');
const mongoose = require('mongoose');
const _cors = require('cors');

const app = express();

// Allow cross-origin requests
// app.use(cors());

// Set up GraphQL server at /graphql endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, ()=> {
  console.log('Now listening for requests on port 4000')
});

// Connect to MongoDB
const db = process.env.MONGO_DB
mongoose.connect(db);
// mongoose.connect('mongodb://localhost/graphql');

mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

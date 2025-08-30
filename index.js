const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const {graphqlHTTP}=require('express-graphql');
const schema = require('./graphql-schema');
const {rootResolver}=require('./resolvers');
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost',
  credentials:true,
}));
dotenv.config();
const knexInstance=require('./db/connection');
const port=process.env.PORT||8000;
app.use(express.json());
app.use('/graphql', //graphqlValidator,
    graphqlHTTP({
      schema,
      graphiql: true,
      customFormatErrorFn: (err) => {
      // Ici tu peux logger, envoyer à Sentry, etc.
      console.error("GraphQL Error:", err.message);
      return {
        message: err.message,
        code: err.originalError?.code || 500,
      };
  },
}));
/*app.use((err, req, res, next) => {

  console.error(err.message);
  const status = err.status || 500;

  // If it's a validation error
  if (err.details) {
    return res.status(status).json({
      error: 'Validation failed',
      details: err.details,
    });
  }
  // Otherwise, a generic server error
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
});*/
app.listen(port,()=>{
    console.log(`Node server listening on the port ${port}`)
})

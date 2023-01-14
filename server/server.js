const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./util/auth');

const db = require('./config/connection.js');
const { config } = require('dotenv');
config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// stores the server and options to 'server' variable
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

/*
app.use(express.static(path.join(__dirname, '../client/src')));
/*
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/src')));
}
  
/*
//serve homepage
app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, '../client/src/index.html'));
})
*/
//function to start server
const startApolloServer = async (typeDefs, resolvers) => {

    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => console.log(`... Listening on port: ${PORT} `));
    });

}

//call function to start server
startApolloServer(typeDefs, resolvers);

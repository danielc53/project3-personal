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

app.use(
    'graphql',
    graphqlHTTP({
        schema,
        graphql: true
    })
);

app.use(express.static('public'));

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})


const startApolloServer = async (typeDefs, resolvers) => {

    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => console.log(`... Listening on port: ${PORT} `));
    });

}

//call function to start server
startApolloServer(typeDefs, resolvers);

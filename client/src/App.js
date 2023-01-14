import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route } from "react-router-dom"
import Homepage from './Pages/Homepage';
import MessengerPage from './Pages/MessengerPage';
// import Navbar from './components/Navbar'
import './App.css';
import AccountSettings from './Pages/AccountSettings'
import Chats from './components/Chats'

const client = new ApolloClient({

    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache()


});

function App() {

    return (<div className="App">
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Route path="/" component={Homepage} exact />
                <Route path="/messager" component={MessengerPage} exact />
                <Route path="/settings" component={AccountSettings} exact />
                <Route path="/chats" component={Chats}/>
            </BrowserRouter>
        </ApolloProvider>
    </div>
    )

}
export default App;
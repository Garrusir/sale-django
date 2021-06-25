import React from 'react';
import ApolloClient from 'apollo-boost';
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import {useRoutes} from "./routes";

import {Navigation} from "./components/Navigation";

import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql/',
});

function App() {
    const routes = useRoutes();
    const {login, logout, userId, isAuth, ready, role} = useAuth();
    return (
        <AuthContext.Provider value={{
            login, logout, userId, isAuth, ready, role
        }}>
            <BrowserRouter>
                <ApolloProvider client={client}>
                    {!ready ? 'Loading' : (
                        <React.Fragment>
                            <Navigation className="navigation"/>
                            <div className="container">
                                {routes}
                            </div>
                        </React.Fragment>)}
                </ApolloProvider>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;


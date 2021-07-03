import React from 'react';
import ApolloClient from 'apollo-boost';
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import {CircularProgress} from "@material-ui/core";
import {useRoutes} from "./routes";

import {Navigation} from "./components/Navigation";

import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import Footer from "./components/Footer";
import {makeStyles} from "@material-ui/core/styles";

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql/',
});

const useStyles = makeStyles(() => ({
    spinnerWrap: {
        minHeight: '80vh',
        position: 'relative',
    },
    spinner: {
        top: `50%`,
        right: `50%`,
        transform: `translate(50%, -50%)`,
        position: 'absolute',
    },
}));

function App() {
    const classes = useStyles();
    const {login, logout, ready, role, user, register} = useAuth();
    const routes = useRoutes(user, role);

    return (
        <AuthContext.Provider value={{
            login, logout, ready, role, user, register
        }}>
            <BrowserRouter>
                <ApolloProvider client={client}>
                    {!ready ? (
                        <div className={classes.spinnerWrap}>
                            <CircularProgress className={classes.spinner} />
                        </div>
                    ): (
                        <React.Fragment>
                            <Navigation className="navigation"/>
                            <div className="container">
                                {routes}
                            </div>
                            <Footer />
                        </React.Fragment>)}
                </ApolloProvider>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;


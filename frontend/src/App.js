import React, {useEffect, useState} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql/', // your GraphQL Server
});

function App() {
    const [sales, setSales] = useState([]);

    useEffect( () => {
        // const result = await fetch('api/sales');
        // const result = [{id: 1, title: 'Sale 1'}];
        fetch('api/sales/')
            .then((response) => {
                // console.log('result', response.json());
                if (response.status > 400) {
                    console.log('error', response);
                }
                return response.json();
            })
            .then(({sales}) => {
                console.log('data', sales);
                setSales(sales);
            })
    }, [])

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const login = () => {
        const data = {
            "username": "test@email.com",
            "password": "zcSFcvJS"
        };
        const csrftToken = getCookie('csrftoken');
        fetch('api/auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftToken,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status > 400) {
                    console.log('error', response);
                }
                return response.json();
            })
            .then((data) => {
                console.log('login', data.message);
            })
    }

    const register = () => {
        const csrftToken = getCookie('csrftoken');
        const data = {
            "email": "test@email.com",
            "password": "zcSFcvJS",
            "firstName": "John",
            "lastName": "Smith"
        }
        fetch('api/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftToken,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status > 400) {
                    console.log('error', response);
                }
                return response.json();
            })
            .then((data) => {
                console.log('register', data.message);
            })
    }

    return (
        <ApolloProvider client={client}>
            <div style={{
                backgroundColor: '#00000008',
                display: 'flex',
                justifyContent:'center',
                alignItems:'center',
                height: '100vh',
                flexDirection: 'column',
            }}>
                <h2>My first Apollo app <span role="img" aria-label="rocket">🚀</span></h2>
                <div className="container">
                    <h1>Sales111</h1>
                    <ul>
                        {
                            sales.map(item =>
                                (<li key={item.id}>
                                    {item.title}
                                </li>))
                        }
                    </ul>
                    <button onClick={login}>login</button>
                    <button onClick={register}>Зарегестрироваться</button>
                </div>
            </div>
        </ApolloProvider>
    )
}

export default App;


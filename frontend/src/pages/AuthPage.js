import React from 'react';

export function AuthPage() {
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

    return (
        <div>
            <h1>Страница авторизации</h1>
            <button onClick={login}>login</button>
        </div>
    )
}

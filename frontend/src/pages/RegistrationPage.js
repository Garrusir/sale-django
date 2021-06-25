import React from 'react';

export function RegistrationPage() {
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
        <div>
            <h1>Страница регистрации</h1>
            <button onClick={register}>Зарегестрироваться</button>
        </div>
    )
}

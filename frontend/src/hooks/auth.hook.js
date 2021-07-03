import { useState, useCallback, useEffect } from 'react';
import { getCookie } from "../utils";

export const useAuth = () => {
    const [ready, setReady] = useState(false);
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);

    const login = useCallback((username, password) => {
        const csrftToken = getCookie('csrftoken');
        return fetch(`${window.location?.origin}/api/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftToken,
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (response.status > 400) {
                    console.log('error', response);
                }
                return response.json();
            })
            .then((data) => {
                console.info(data);
                if (!data.error) {
                    setRole(data?.role);
                    setUser(data?.user);
                }

                return data;
            });
    }, []);
    const logout = useCallback(() => {
        const csrftToken = getCookie('csrftoken');
        fetch(`${window.location?.origin}/api/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftToken,
            },
        })
            .then((response) => {
                if (response.status > 400) {
                    console.log('error', response);
                }
                return response.json();
            })
            .then(() => {
                setUser(null);
                setRole(null);
            });

        console.log('logout');
    }, []);

    const register = useCallback((fields) => {
        const csrftToken = getCookie('csrftoken');
        return fetch(`${window.location?.origin}/api/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftToken,
            },
            body: JSON.stringify(fields),
        })
            .then((response) => {
                if (response.status > 400) {
                    console.log('error', response);
                }
                return response.json();
            })
            .then((data) => {
                setUser(data?.user);
                setRole(data?.role);
            });
    }, []);

    const checkUser = useCallback(() => {
        const csrftToken = getCookie('csrftoken');
        fetch(`${window.location?.origin}/api/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftToken,
            },
        })
            .then((response) => {
                if (response.status > 400) {
                    console.log('error', response);
                }
                return response.json();
            })
            .then((data) => {
                if (data.isAuth) {
                    setUser(data?.user);
                    setRole(data?.role);
                }
            })
            .finally(() => setReady(true));
    }, []);

    useEffect(() => {
        const sessionid = getCookie('sessionid');
        console.info('SESSION', sessionid);

        if (sessionid) {
            checkUser();
        }

        setReady(true);
    }, [checkUser])

    useEffect(() => {
        console.info(user);
    }, [user])

    return { login, logout, ready, role, user, register }
}

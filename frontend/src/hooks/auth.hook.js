import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
    // const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null);

    const login = useCallback((username, password) => {
        console.log('login', username, password);
        // setToken(jwtToken);
        setUserId('someUserId');
        setRole('user');
        //
        // localStorage.setItem(storageName, JSON.stringify({
        //     userId: id, token: jwtToken
        // }))
    }, []);
    const logout = useCallback(() => {
        // setToken(null);
        setUserId(null);
        // localStorage.removeItem(storageName);
        console.log('logout');
    }, []);

    useEffect(() => {
        console.log('update auth');
        // const data = JSON.parse(localStorage.getItem(storageName));
        //
        // if (data && data.token) {
        //     login(data.token, data.userId);
        // }
        //
        setTimeout(() => {
            setReady(true);
            // todo remove
            login();
        }, 1000);
    }, [login])

    return { login, logout, userId, ready, role }
}

import React, {useContext} from "react";
import { Link as RouterLink }from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useAuth} from "../hooks/auth.hook";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export const Navigation = () => {
    const auth = useContext(AuthContext);
    const {logout} = useAuth();

    // const logoutHandler = (event) => {
    //     event.preventDefault();
    //     logout();
    // }


    function renderNavigation() {
        switch (auth.role) {
            case 'user':
                return <nav className="toolbar">
                    <Link component={RouterLink} to="/catalog" variant="button" color="textPrimary" href="#" className="link">
                        Каталог
                    </Link>
                    <Link component={RouterLink} to="/promocodes" variant="button" color="textPrimary" href="#" className="link">
                        Промокоды
                    </Link>
                    <Link component={RouterLink} to="/retailers" variant="button" color="textPrimary" href="#" className="link">
                        Магазины
                    </Link>
                    <Link component={RouterLink} to="/profile" variant="button" color="textPrimary" href="#" className="link">
                        Профиль
                    </Link>
                    <Link onClick={logout} variant="button" color="textPrimary" href="#" className="link">
                        Выйти
                    </Link>
                </nav>;
            default:
                return <div>Нет такой роли</div>;
        }
    }

    return <AppBar position="static" color="default" className="appBar">
        <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className="toolbarTitle">
               Скидки и акциии <span role="img" aria-label="rocket">🚀</span>
            </Typography>
            {renderNavigation()}
        </Toolbar>
    </AppBar>
}

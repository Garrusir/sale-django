import React, {useContext} from "react";
import { Link as RouterLink }from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export const Navigation = () => {
    const auth = useContext(AuthContext);

    function renderNavigation() {
        switch (auth.role) {
            case 'member':
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
                    <Link onClick={auth.logout} variant="button" color="textPrimary" href="#" className="link">
                        Выйти
                    </Link>
                </nav>;
            case 'staff':
            case 'administrator':
                return <nav className="toolbar">
                    <Link component={RouterLink} to="/dashboard" variant="button" color="textPrimary" href="#" className="link">
                        Дашборд
                    </Link>
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
                    <Link onClick={auth.logout} variant="button" color="textPrimary" href="#" className="link">
                        Выйти
                    </Link>
                </nav>;
            default:
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
                    <Link component={RouterLink} to="/login" variant="button" color="textPrimary" href="#" className="link">
                        Вход
                    </Link>
                    <Link component={RouterLink} to="/register" variant="button" color="textPrimary" href="#" className="link">
                        Регистрация
                    </Link>
                </nav>;
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

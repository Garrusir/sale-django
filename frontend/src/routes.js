import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {AuthPage} from "./pages/AuthPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {CatalogPage} from "./pages/CatalogPage";
import {ProfilePage} from "./pages/ProfilePage";
import {PromoCodesPage} from "./pages/PromocodesPage";
import {ShopsPage} from "./pages/ShopsPage";
import {DashboardPage} from "./pages/DashboardPage";

export const useRoutes = (user, role) => {
    if (!user) {
        return (
            <Switch>
                <Route path="/login" exact>
                    <AuthPage page="open"/>
                </Route>
                <Route path="/register" exact>
                    <RegistrationPage page="taken"/>
                </Route>
                <Route path="/catalog">
                    <CatalogPage/>
                </Route>
                <Route path="/retailers">
                    <ShopsPage/>
                </Route>
                <Route path="/promocodes">
                    <PromoCodesPage/>
                </Route>
                <Redirect to="/catalog"/>
            </Switch>
        )
    } else {
        return <Switch>
            <Route path="/catalog">
                <CatalogPage/>
            </Route>
            <Route path="/profile">
                <ProfilePage/>
            </Route>
            <Route path="/retailers">
                <ShopsPage/>
            </Route>
            <Route path="/promocodes">
                <PromoCodesPage/>
            </Route>
            {
                role !== 'member' && <Route path="/dashboard">
                    <DashboardPage/>
                </Route>
            }
            <Redirect to={role !== 'member' ? '/dashboard' : "/catalog"}/>
        </Switch>
    }
}

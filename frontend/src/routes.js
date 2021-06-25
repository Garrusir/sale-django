import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {AuthPage} from "./pages/AuthPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {CatalogPage} from "./pages/CatalogPage";
import {SaleDetailPage} from "./pages/SaleDetailPage";
import {ProfilePage} from "./pages/ProfilePage";
import {PromocodesPage} from "./pages/PromocodesPage";
import {ShopsPage} from "./pages/ShopsPage";


export const useRoutes = ()=> {
    const currentUser = true;
    // const {currentUser} = useAuth();
    // console.log('currentUser routes', currentUser.role);

    if (!currentUser) {
        return (
            <Switch>
                <Route path="/login" exact>
                    <AuthPage page="open"/>
                </Route>
                <Route path="/registration" exact>
                    <RegistrationPage page="taken"/>
                </Route>
                <Route path="/catalog">
                    <CatalogPage/>
                </Route>
                <Route path="/catalog/:id">
                    <SaleDetailPage/>
                </Route>
                <Route path="/retailers">
                    <ShopsPage/>
                </Route>
                <Route path="/promocodes">
                    <PromocodesPage/>
                </Route>
                <Redirect to="/catalog"/>
            </Switch>
        )
    } else {
        return <Switch>
            <Route path="/catalog">
                <CatalogPage/>
            </Route>
            <Route path="/catalog/:id">
                <SaleDetailPage/>
            </Route>
            <Route path="/profile">
                <ProfilePage/>
            </Route>
            <Route path="/retailers">
                <ShopsPage/>
            </Route>
            <Route path="/promocodes">
                <PromocodesPage/>
            </Route>
            <Redirect to="/catalog"/>
        </Switch>
    }
}

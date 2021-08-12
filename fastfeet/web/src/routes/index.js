import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Login from '../pages/Login';

import Couriers from '~/pages/Couriers';
import Packages from '~/pages/Packages';
import Problems from '~/pages/Problems';
import Recipients from '~/pages/Recipients';

import RegisterPackage from '~/pages/RegisterPackage';
import RegisterCourier from '~/pages/RegisterCourier';
import RegisterRecipient from '~/pages/RegisterRecipient';

import EditRecipient from '~/pages/EditRecipient';
import EditCourier from '~/pages/EditCourier';
import EditPackage from '~/pages/EditPackage';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/couriers" isPrivate component={Couriers} />
            <Route path="/packages" isPrivate component={Packages} />
            <Route path="/problems" isPrivate component={Problems} />
            <Route path="/recipients" isPrivate component={Recipients} />

            <Route path="/edit/courier" isPrivate component={EditCourier} />
            <Route path="/edit/recipient" isPrivate component={EditRecipient} />
            <Route path="/edit/package" isPrivate component={EditPackage} />

            <Route
                path="/register/recipient"
                isPrivate
                component={RegisterRecipient}
            />
            <Route
                path="/register/courier"
                isPrivate
                component={RegisterCourier}
            />
            <Route
                path="/register/package"
                isPrivate
                component={RegisterPackage}
            />
        </Switch>
    );
}

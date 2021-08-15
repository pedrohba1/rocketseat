import 'react-native-gesture-handler';
import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#7159c1',
                    },
                    headerBackTitleVisible: false,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{title: 'Usuários'}}
                />
                <Stack.Screen
                    name="User"
                    component={User}
                    options={{title: 'Usuário'}}
                />
                <Stack.Screen
                    name="Repository"
                    component={Repository}
                    options={{title: 'Repositório'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;

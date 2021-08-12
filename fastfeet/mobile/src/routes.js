// In App.js in a new project
import 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from '~/pages/SignIn';

import Dashboard from '~/pages/Deliveries/Dashboard';
import PackDetails from '~/pages/Deliveries/PackDetails';
import InformProblem from '~/pages/Deliveries/InformProblem';
import ConfirmDeliver from '~/pages/Deliveries/ConfirmDeliver';
import ViewProblems from '~/pages/Deliveries/ViewProblems';

import Profile from '~/pages/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function LoginTabs() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="signIn" component={SignIn} />
        </Stack.Navigator>
    );
}

function Deliveries() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
                name="PackDetails"
                component={PackDetails}
                options={{
                    title: 'Detalhes da encomenda',
                    headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: '#7D40E7' },
                }}
            />
            <Stack.Screen
                name="InformProblem"
                component={InformProblem}
                options={{
                    title: 'Informar problema',
                    headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: '#7D40E7' },
                }}
            />
            <Stack.Screen
                name="ViewProblems"
                component={ViewProblems}
                options={{
                    title: 'Visualizar problemas',
                    headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: '#7D40E7' },
                }}
            />
            <Stack.Screen
                name="ConfirmDeliver"
                component={ConfirmDeliver}
                options={{
                    title: 'Confirmar entrega',
                    headerShown: true,
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#7D40E7',
                    },
                }}
            />
        </Stack.Navigator>
    );
}

function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarVisible: route.name !== 'Agendar',
                // eslint-disable-next-line react/prop-types
                tabBarIcon: ({ focused }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Agendar': {
                            iconName = 'add-circle-outline';
                            break;
                        }
                        case 'Profile': {
                            iconName = 'person';
                            break;
                        }
                        case 'Deliveries': {
                            iconName = 'view-headline';
                            break;
                        }

                        default:
                    }

                    return (
                        <Icon
                            name={iconName}
                            size={20}
                            color={focused ? '#7D40E7' : '#999999'}
                        />
                    );
                },
            })}
            tabBarOptions={{
                keyboardHidesTabBar: true,
                activeTintColor: '#7D40E7',
                inactiveTintColor: '#999999',
                style: {
                    backgroundColor: '#FFFFFF',
                },
            }}
        >
            <Tab.Screen
                options={{ tabBarLabel: 'Entregas' }}
                name="Deliveries"
                component={Deliveries}
            />
            <Tab.Screen
                options={{ tabBarLabel: 'Meu Perfil' }}
                name="Profile"
                component={Profile}
            />
        </Tab.Navigator>
    );
}

function Routes() {
    // TODO: criar o reducer de auth para colocar ele aqui usando o
    // useSelector
    const signed = useSelector(state => state.auth.signed);

    return (
        <NavigationContainer>
            <RootStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {signed ? (
                    <RootStack.Screen name="Home" component={HomeTabs} />
                ) : (
                    <RootStack.Screen name="Login" component={LoginTabs} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;

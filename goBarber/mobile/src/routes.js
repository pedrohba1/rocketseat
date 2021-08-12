// In App.js in a new project
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

import SelectProvider from '~/pages/New/SelectProvider';
import SelectDateTime from '~/pages/New/SelectDateTime';
import Confirm from '~/pages/New/Confirm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const CreateNew = createStackNavigator();

function LoginTabs() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="signIn" component={SignIn} />
            <Stack.Screen name="signUp" component={SignUp} />
        </Stack.Navigator>
    );
}

function NewStackScreens() {
    return (
        <CreateNew.Navigator
            screenOptions={{
                headerTransparent: true,
                headerTintColor: ' #fff',
                headerLeftContainerStyle: {
                    marginLeft: 20,
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#fff',
                },
            }}
        >
            <CreateNew.Screen
                name="SelectProvider"
                component={SelectProvider}
                options={{ title: 'Selecione o prestador' }}
            />
            <CreateNew.Screen
                name="SelectDateTime"
                component={SelectDateTime}
                options={{ title: 'Selecione o horário' }}
            />
            <CreateNew.Screen
                name="Confirm"
                component={Confirm}
                options={{ title: 'Confirmar o agendamento' }}
            />
        </CreateNew.Navigator>
    );
}

function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarVisible: route.name !== 'Agendar',
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
                        case 'Dashboard': {
                            iconName = 'event';
                            break;
                        }

                        default:
                    }

                    return (
                        <Icon
                            name={iconName}
                            size={20}
                            color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
                        />
                    );
                },
            })}
            tabBarOptions={{
                keyboardHidesTabBar: true,
                activeTintColor: '#fff',
                inactiveTintColor: 'rgba(255,255,255,0.6)',
                style: {
                    backgroundColor: '#8d41a8',
                },
            }}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Agendar" component={NewStackScreens} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

function Routes() {
    const signed = useSelector(state => state.auth.signed);

    return (
        <NavigationContainer>
            <RootStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {signed ? (
                    <RootStack.Screen
                        name="Home"
                        component={HomeTabs}
                    ></RootStack.Screen>
                ) : (
                    <RootStack.Screen
                        name="Login"
                        component={LoginTabs}
                    ></RootStack.Screen>
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;

// In App.js in a new project
import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import colors from './styles/colors';

import Home from './pages/Home';
import Cart from './pages/Cart';
import ShoesHeader from './components/ShoesHeader';

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    header: () => <ShoesHeader />,
                    ...TransitionPresets.DefaultTransition,
                    cardStyle: {
                        backgroundColor: colors.dark,
                    },
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Cart" component={Cart} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;

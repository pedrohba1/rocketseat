import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../../styles/colors';

import { Logo, BasketContainer, ItemCount } from './styles';

export default function ShoesHeader() {
    const navigation = useNavigation();
    const cartSize = useSelector(state => state.cart.length);

    return (
        <Header
            statusBarProps={{
                barStyle: 'light-content',
                backgroundColor: colors.dark,
            }}
            containerStyle={{
                backgroundColor: colors.dark,
                justifyContent: 'space-around',
            }}
            leftComponent={() => (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Logo />
                </TouchableOpacity>
            )}
            rightComponent={() => (
                <BasketContainer onPress={() => navigation.navigate('Cart')}>
                    <Icon name="shopping-basket" color="#FFF" size={24} />
                    <ItemCount>{cartSize}</ItemCount>
                </BasketContainer>
            )}
        />
    );
}

ShoesHeader.defaultProps = {
    cartSize: 0,
};

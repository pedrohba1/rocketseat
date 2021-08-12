import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { RectButton } from 'react-native-gesture-handler';
import { Header, Icon } from 'react-native-elements';
import colors from '../../styles/colors';

import { Wrapper, Container, Logo, BasketContainer, ItemCount } from './styles';

function ShoesHeader() {
    const navigation = useNavigation();

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
                <RectButton onPress={() => navigation.navigate('Home')}>
                    <Logo />
                </RectButton>
            )}
            rightComponent={() => (
                <BasketContainer onPress={() => navigation.navigate('Cart')}>
                    <Icon name="shopping-basket" color="#FFF" size={24} />
                    <ItemCount>{0}</ItemCount>
                </BasketContainer>
            )}
        />
    );
}
export default ShoesHeader;

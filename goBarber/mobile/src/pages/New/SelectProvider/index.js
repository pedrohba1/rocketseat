import React, { useLayoutEffect, useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { CommonActions } from '@react-navigation/native';
import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ProvidersList, Name, Avatar, Provider } from './styles';

export default function SelectProvider({ navigation }) {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        async function loadProviders() {
            const response = await api.get('providers');
            setProviders(response.data);
        }
        loadProviders();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Icon name="chevron-left" size={20} color="#fff" />
                </TouchableOpacity>
            ),
        });
    }, []);

    return (
        <Background>
            <Container>
                <ProvidersList
                    data={providers}
                    keyExtractor={provider => String(provider.id)}
                    renderItem={({ item: provider }) => (
                        <Provider
                            onPress={() => {
                                navigation.navigate('SelectDateTime', {
                                    provider,
                                });
                            }}
                        >
                            <Avatar
                                source={{
                                    uri: provider.avatar
                                        ? provider.avatar.url
                                        : 'https://api.adorable.io/avatar/50/rocket.png',
                                }}
                            />
                            <Name>{provider.name}</Name>
                        </Provider>
                    )}
                />
            </Container>
        </Background>
    );
}

import React, { useLayoutEffect, useMemo } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import api from '~/services/api';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ navigation, route }) {
    const { time, provider } = route.params;

    const dateFormatted = useMemo(
        () => formatRelative(parseISO(time), new Date(), { locale: pt }),
        [time]
    );

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

    async function handleAddAppointment() {
        const response = await api.post('appointments', {
            provider_id: provider.id,
            date: time,
        });

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Agendar' }],
            })
        );
        navigation.navigate('Dashboard');
    }

    return (
        <Background>
            <Container>
                <Avatar
                    source={{
                        uri: provider.avatar
                            ? provider.avatar.url
                            : 'https://api.adorable.io/avatar/50/rocket.png',
                    }}
                />

                <Name>{provider.name}</Name>
                <Time>{dateFormatted}</Time>
                <SubmitButton onPress={handleAddAppointment}>
                    Confirmar agendamento
                </SubmitButton>
            </Container>
        </Background>
    );
}

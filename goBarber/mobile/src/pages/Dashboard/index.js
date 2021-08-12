import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Container, Title, List } from './styles';
import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

export default function Dashboard({ navigation }) {
    const [appointments, setAppointments] = useState([]);

    useFocusEffect(() => {
        async function loadAppointments() {
            const response = await api.get('appointments');
            setAppointments(response.data);
        }
        loadAppointments();
    }, []);

    async function handleCancel(id) {
        const response = await api.delete(`appointments/${id}`);
        setAppointments(
            appointments.map(appointment =>
                appointment.id === id
                    ? { ...appointment, canceled_at: response.data.canceled_at }
                    : appointment
            )
        );
    }

    return (
        <Background>
            <Container>
                <Title>Agendamentos</Title>

                <List
                    data={appointments}
                    renderItem={({ item }) => (
                        <Appointment
                            onCancel={() => handleCancel(item.id)}
                            data={item}
                        />
                    )}
                    keyExtractor={item => String(item.id)}
                />
            </Container>
        </Background>
    );
}

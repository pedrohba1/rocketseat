import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'react-native';

import logo from '~/assets/images/logo.png';

import { Container, Form, FormInput, SubmitButton, Background } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
    const dispatch = useDispatch();

    const [id, setId] = useState('');

    function handleSubmit() {
        dispatch(signInRequest(id));
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />
                <Form>
                    <FormInput
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={id}
                        onChangeText={setId}
                        placeholder="Informe seu ID de cadastro"
                    />
                    <SubmitButton onPress={handleSubmit}>
                        Entrar no sistema
                    </SubmitButton>
                </Form>
            </Container>
        </Background>
    );
}

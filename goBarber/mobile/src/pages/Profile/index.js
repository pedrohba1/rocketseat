import React, { useRef, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';

import Background from '~/components/Background';

import {
    Container,
    Form,
    FormInput,
    Title,
    SubmitButton,
    Separator,
    LogoutButton,
} from './styles';

import { SignOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(state =>
        state.user.profile !== null
            ? state.user.profile
            : { name: '', email: '' }
    );

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const oldPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    useEffect(() => {
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    }, [profile]);

    function handleSubmit() {
        setLoading(true);
        dispatch(
            updateProfileRequest({
                name,
                email,
                oldPassword,
                password,
                confirmPassword,
            })
        );
        setLoading(false);
    }

    function handleLogout() {
        dispatch(SignOut());
    }

    return (
        <Background>
            <Container>
                <Title>Meu perfil</Title>

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="digite seu nome completo"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            emailRef.current.focus();
                        }}
                        value={name}
                        onChangeText={setName}
                    />

                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="digite seu email"
                        ref={emailRef}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            oldPasswordRef.current.focus();
                        }}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Separator />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="sua senha atual"
                        ref={oldPasswordRef}
                        returnKeyType="send"
                        onSubmitEditing={() => {
                            passwordRef.current.focus();
                        }}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="sua nova senha"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={() => {
                            confirmPasswordRef.current.focus();
                        }}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="confirmação de senha"
                        ref={confirmPasswordRef}
                        returnKeyType="send"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <SubmitButton loading={loading} onPress={handleSubmit}>
                        Atualizar perfil
                    </SubmitButton>
                    <LogoutButton onPress={handleLogout}>
                        Sair do GoBarber
                    </LogoutButton>
                </Form>
            </Container>
        </Background>
    );
}

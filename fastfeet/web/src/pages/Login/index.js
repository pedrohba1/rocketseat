import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/fastfeet-logo@2x.png';
import { signInRequest } from '~/store/modules/auth/actions';
import { changeTab } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('insira um email válido')
        .required('o email é obrigatório'),
    password: Yup.string().required('a senha é obrigatória'),
});

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    async function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password));
        dispatch(changeTab('couriers'));
    }

    return (
        <>
            <img src={logo} alt="fastFeet" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <h4>SEU EMAIL</h4>
                <Input name="email" type="email" placeholder="seu email" />
                <h4>SUA SENHA</h4>

                <Input
                    name="password"
                    type="password"
                    placeholder="sua senha"
                />

                <button type="submit">
                    {loading ? 'Carregando...' : 'Entrar no sistema'}
                </button>
            </Form>
        </>
    );
}

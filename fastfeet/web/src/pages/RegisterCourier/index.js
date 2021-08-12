import React, { useState } from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { RegisterButton, Title } from '~/styles/default';
import AvatarInput from '~/components/AvatarInput';

import {
    Container,
    Buttons,
    BackButton,
    Header,
    FormContainer,
    TextInputs,
} from './styles';
import api from '~/services/api';

import { changeTab } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
        .email()
        .required(),
});

export default function RegisterCourier() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [preview, setPreview] = useState('');
    const [file, setFile] = useState(0);

    const dispatch = useDispatch();

    function handleReturn() {
        dispatch(changeTab('couriers'));
    }

    async function handleSubmit() {
        const data = {
            name,
            email,
        };
        if (file) {
            data.avatar_id = file;
        }

        if (!(await schema.isValid(data))) {
            toast.error('formulário inválido, verifique seus dados');
            return;
        }
        api.post('couriers', data)
            .then(() => {
                toast.success('entregador cadastrado com sucesso!');
            })
            .catch(err => {
                if (err.response.status === 461) {
                    toast.error('já existe um entregador com este email');
                } else {
                    toast.error(
                        'falha no cadastro de entregador, algo deu errado'
                    );
                }
            });
    }

    async function handleFileChange(e) {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        const response = await api.post('files', data);
        const { id, url } = response.data;
        setFile(id);
        setPreview(url);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro de entregadores</Title>

                <Buttons>
                    <BackButton onClick={handleReturn}>
                        <MdChevronLeft size={20} />
                        <span>VOLTAR</span>
                    </BackButton>
                    <RegisterButton onClick={handleSubmit}>
                        <MdCheck size={20} />
                        <span>SALVAR</span>
                    </RegisterButton>
                </Buttons>
            </Header>

            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <AvatarInput
                        handleFileChange={handleFileChange}
                        preview={preview}
                        file={file}
                    />

                    <TextInputs>
                        <h4>Nome</h4>
                        <input
                            placeholder="nome do entregador"
                            value={name}
                            onChange={e => {
                                setName(e.target.value);
                            }}
                        />
                        <h4>Email</h4>
                        <input
                            type="email"
                            placeholder="email do entregador"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                        />
                    </TextInputs>
                </form>
            </FormContainer>
        </Container>
    );
}

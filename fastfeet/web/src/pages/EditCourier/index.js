import React, { useState } from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { RegisterButton, Title } from '~/styles/default';
import AvatarInput from '~/components/AvatarInput';
import AvatarEditInput from '~/components/AvatarEditInput';

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

export default function EditCourier() {
    const courierId = useSelector(state => state.courier.data.id);

    const [name, setName] = useState(
        useSelector(state => state.courier.data.name)
    );
    const [email, setEmail] = useState(
        useSelector(state => state.courier.data.email)
    );
    const [preview, setPreview] = useState(
        useSelector(state => {
            if (state.courier.data.avatar) {
                return state.courier.data.avatar.url;
            }
            return '';
        })
    );
    const [file, setFile] = useState(
        useSelector(state => {
            if (state.courier.data.avatar) {
                return state.courier.data.avatar.id;
            }
            return '';
        })
    );

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
        api.put(`couriers/${courierId}`, data)
            .then(() => {
                toast.success('entregador atualizado com sucesso!');
            })
            .catch(() => {
                toast.error(
                    'falha na atualização de entregador, algo deu errado'
                );
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
                <Title>Edição de entregadores</Title>

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
                    {file ? (
                        <AvatarInput
                            handleFileChange={handleFileChange}
                            preview={preview}
                            file={file}
                        />
                    ) : (
                        <AvatarEditInput
                            handleFileChange={handleFileChange}
                            name={name}
                        />
                    )}

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

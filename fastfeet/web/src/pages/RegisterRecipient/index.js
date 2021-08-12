import React, { useState } from 'react';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ReactInputMask from 'react-input-mask';
import { Title, RegisterButton } from '~/styles/default';
import api from '~/services/api';

import {
    Container,
    Header,
    Buttons,
    BackButton,
    FormContainer,
    InputContainer,
    InputLabel,
    Row,
} from './styles';

import { changeTab } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
    name: Yup.string().required(),
    address: Yup.string().required(),
});

export default function RegisterRecipient() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [addressComplement, setAddressComplement] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [cep, setCep] = useState('');

    const dispatch = useDispatch();

    function handleReturn() {
        dispatch(changeTab('recipients'));
    }

    async function handleSubmit() {
        const data = {
            name,
            address,
            address_number: addressNumber,
            state,
            city,
            cep: cep.replace(/\D/g, ''),
        };

        if (!(await schema.isValid(data))) {
            toast.error('formulário inválido, verifique seus dados');
            return;
        }
        api.post('recipients', data)
            .then(() => {
                toast.success('recipiente cadastrado com sucesso!');
            })
            .catch(() => {
                toast.error('falha no cadastro de entregador, algo deu errado');
            });
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro de destinatários</Title>
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
                <Row>
                    <InputContainer width="100%">
                        <InputLabel>Nome</InputLabel>
                        <input
                            value={name}
                            onChange={e => {
                                setName(e.target.value);
                            }}
                        />
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer width="60%">
                        <InputLabel>Rua</InputLabel>
                        <input
                            value={address}
                            onChange={e => {
                                setAddress(e.target.value);
                            }}
                        />
                    </InputContainer>

                    <InputContainer width="20%">
                        <InputLabel>Número</InputLabel>
                        <input
                            value={addressNumber}
                            onChange={e => {
                                setAddressNumber(e.target.value);
                            }}
                        />
                    </InputContainer>

                    <InputContainer width="20%">
                        <InputLabel>Complemento</InputLabel>
                        <input
                            value={addressComplement}
                            onChange={e => {
                                setAddressComplement(e.target.value);
                            }}
                        />
                    </InputContainer>
                </Row>

                <Row>
                    <InputContainer width="100%">
                        <InputLabel>Cidade</InputLabel>
                        <input
                            value={city}
                            onChange={e => {
                                setCity(e.target.value);
                            }}
                        />
                    </InputContainer>

                    <InputContainer width="100%">
                        <InputLabel>Estado</InputLabel>
                        <input
                            value={state}
                            onChange={e => {
                                setState(e.target.value);
                            }}
                        />
                    </InputContainer>

                    <InputContainer width="100%">
                        <InputLabel>CEP</InputLabel>

                        <ReactInputMask
                            mask="99.999-999"
                            value={cep}
                            onChange={e => {
                                setCep(e.target.value);
                            }}
                        />
                    </InputContainer>
                </Row>
            </FormContainer>
        </Container>
    );
}

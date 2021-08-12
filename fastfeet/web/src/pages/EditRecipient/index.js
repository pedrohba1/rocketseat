import React, { useState } from 'react';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
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
    address_number: Yup.string().required(),
    address_complement: Yup.string(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    cep: Yup.string().required(),
});

export default function EditRecipient() {
    const recipientId = useSelector(state => state.recipient.data.id);

    const [name, setName] = useState(
        useSelector(state => state.recipient.data.name)
    );
    const [address, setAddress] = useState(
        useSelector(state => state.recipient.data.address)
    );
    const [addressNumber, setAddressNumber] = useState(
        useSelector(state => state.recipient.data.address_number)
    );
    const [addressComplement, setAddressComplement] = useState(
        useSelector(state => {
            if (state.recipient.data.address_complement) {
                return state.recipient.data.address_complement;
            }
            return '';
        })
    );
    const [city, setCity] = useState(
        useSelector(state => state.recipient.data.city)
    );
    const [state, setState] = useState(
        // eslint-disable-next-line no-shadow
        useSelector(state => state.recipient.data.state)
    );
    const [cep, setCep] = useState(
        // eslint-disable-next-line no-shadow
        useSelector(state => state.recipient.data.cep)
    );

    const dispatch = useDispatch();

    function handleReturn() {
        dispatch(changeTab('recipients'));
    }

    async function handleSubmit() {
        const data = {
            name,
            address,
            address_number: addressNumber,
            address_complement: addressComplement,
            state,
            city,
            cep: cep.replace(/\D/g, ''),
        };

        if (!(await schema.isValid(data))) {
            toast.error('formulário inválido, verifique seus dados');
            return;
        }
        api.put(`recipients/${recipientId}`, data)
            .then(() => {
                toast.success('recipiente atualizado com sucesso!');
            })
            .catch(() => {
                toast.error(
                    'falha na atualização de recipiente, algo deu errado'
                );
            });
    }
    return (
        <Container>
            <Header>
                <Title>Edição de destinatários</Title>
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

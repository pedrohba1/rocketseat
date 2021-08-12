import React, { useState } from 'react';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Select from 'react-select';

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

const SelectorStyles = {
    input: () => ({
        height: 40,
    }),
};

export default function RegisterPackage() {
    const [recipients, setRecipients] = useState([]);
    const [couriers, setCouriers] = useState([]);
    const [recipientInput, setRecipientInput] = useState('');
    const [courierInput, setCourierInput] = useState('');
    const [product, setProduct] = useState('');

    const [selectedRecipient, setSelectedRecipient] = useState({});
    const [selectedCourier, setSelectedCourier] = useState({});

    const dispatch = useDispatch();

    function handleReturn() {
        dispatch(changeTab('packages'));
    }

    async function searchRecipients() {
        const response = await api.get('recipients', {
            params: {
                page: 1,
                input: recipientInput,
            },
        });

        const tempArr = [];
        function makeNewArray(elem) {
            tempArr.push({ value: elem.id, label: elem.name });
        }
        response.data.forEach(makeNewArray);
        setRecipients(tempArr);
    }

    async function searchCouriers() {
        const response = await api.get('couriers', {
            params: {
                page: 1,
                input: courierInput,
            },
        });

        const tempArr = [];
        function makeNewArray(elem) {
            tempArr.push({
                value: elem.id,
                label: `${elem.name}, (${elem.email})`,
            });
        }
        response.data.forEach(makeNewArray);
        setCouriers(tempArr);
    }

    function handleRecipientInputChange(newInput) {
        setRecipientInput(newInput);
        searchRecipients();
    }

    function handleCourierInputChange(newInput) {
        setCourierInput(newInput);
        searchCouriers();
    }

    async function handleSubmit() {
        api.post('packages', {
            recipient_id: selectedRecipient.value,
            courier_id: selectedCourier.value,
            product,
        })
            .then(() => {
                toast.success('encomenda cadastrada com sucesso!');
            })
            .catch(() => {
                toast.error('falha no cadastro de entregador, algo deu errado');
            });
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro de encomenda</Title>
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
                    <InputContainer width="50%">
                        <InputLabel>Destinatário</InputLabel>
                        <Select
                            styles={SelectorStyles}
                            value={selectedRecipient}
                            options={recipients}
                            onChange={setSelectedRecipient}
                            onInputChange={handleRecipientInputChange}
                        />
                    </InputContainer>

                    <InputContainer width="50%">
                        <InputLabel>Entregador</InputLabel>
                        <Select
                            styles={SelectorStyles}
                            value={selectedCourier}
                            options={couriers}
                            onChange={setSelectedCourier}
                            onInputChange={handleCourierInputChange}
                        />
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer width="100%">
                        <InputLabel>Nome do produto</InputLabel>
                        <input
                            value={product}
                            onChange={e => setProduct(e.target.value)}
                        />
                    </InputContainer>
                </Row>
            </FormContainer>
        </Container>
    );
}

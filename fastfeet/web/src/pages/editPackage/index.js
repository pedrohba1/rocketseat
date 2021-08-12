import React, { useState } from 'react';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
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

export default function EditPackage() {
    const packageId = useSelector(state => state.pack.data.package_id);
    const [recipients, setRecipients] = useState([]);
    const [couriers, setCouriers] = useState([]);
    const [recipientInput, setRecipientInput] = useState('');
    const [courierInput, setCourierInput] = useState('');
    const [product, setProduct] = useState(
        useSelector(state => {
            if (state.pack) {
                return state.pack.data.product;
            }
            return '';
        })
    );

    const [selectedRecipient, setSelectedRecipient] = useState(
        useSelector(state => {
            if (state.pack) {
                return state.pack.data.selectedRecipient;
            }
            return {};
        })
    );
    const [selectedCourier, setSelectedCourier] = useState(
        useSelector(state => {
            if (state.pack) {
                return state.pack.data.selectedCourier;
            }
            return {};
        })
    );

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
        const data = {
            recipient_id: selectedRecipient.value,
            courier_id: selectedCourier.value,
            product,
        };

        api.put(`packages/${packageId}`, data)
            .then(() => {
                toast.success('pacote atualizado com sucesso!');
            })
            .catch(() => {
                toast.error('falha na atualização de pacote, algo deu errado');
            });
    }
    return (
        <Container>
            <Header>
                <Title>Edição de encomenda</Title>
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

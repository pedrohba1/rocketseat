import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
    Title,
    Buttons,
    RegisterButton,
    SearchIcon,
    Search,
    ListHeader,
    ListMain,
    ListActions,
    Footer,
} from '~/styles/default';

import { List } from './styles';

import DropdownMenu from '~/components/DropdownMenu';
import { changeTab } from '~/store/modules/user/actions';
import { passEditData } from '~/store/modules/recipient/actions';
import api from '~/services/api';

export default function Recipients() {
    const [recipients, setRecipients] = useState([]);
    const [input, setInput] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    function handleAddPage() {
        setPage(page + 1);
    }

    function handleSubtractPage() {
        setPage(page - 1);
    }
    async function searchRecipients() {
        setLoading(true);
        const response = await api.get('recipients', {
            params: {
                page,
                name: input,
            },
        });
        response.data.map(recipient => {
            recipient.idDisplay =
                recipient.id < 10 ? `0${recipient.id}` : recipient.id;
            return recipient;
        });
        setRecipients(response.data);
        setLoading(false);
    }
    useEffect(() => {
        searchRecipients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    function handleEnterPress(e) {
        if (e.which === 13 || e.keyCode === 13) {
            searchRecipients();
        }
    }

    function handleEdit(data) {
        dispatch(passEditData(data));
        dispatch(changeTab('edit/recipient'));
    }

    async function handleDelete(recipientId) {
        await api
            .delete(`recipients/${recipientId}`)
            .then(() => {
                toast.success('destinatário deletado com sucesso!');
                searchRecipients();
            })
            .catch(() => {
                toast.error(
                    'Não foi foi possível deletar destinatário. ELe tem alguma encomenda?'
                );
            });
    }

    return (
        <>
            <Title>Gerenciando destinatários</Title>

            <Buttons>
                <Search
                    loading={loading}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyUp={handleEnterPress}
                    placeholder="buscar por nome de destinatário"
                    iconPosition="left"
                />
                <RegisterButton
                    onClick={() => {
                        dispatch(changeTab('register/recipient'));
                    }}
                >
                    <SearchIcon />
                    <span>CADASTRAR</span>
                </RegisterButton>
            </Buttons>

            <List>
                <ListHeader>
                    <span>ID</span>
                </ListHeader>
                <ListHeader>
                    <span>Nome</span>
                </ListHeader>
                <ListHeader>
                    <span>Endereço</span>
                </ListHeader>
                <ListHeader>
                    <span>Ações</span>
                </ListHeader>
            </List>

            {recipients.map(recipient => (
                <List key={String(recipient.id)}>
                    <ListMain>
                        <span>#{recipient.idDisplay}</span>
                    </ListMain>
                    <ListMain>
                        <span>{recipient.name}</span>
                    </ListMain>
                    <ListMain>
                        <span>
                            {recipient.address}
                            {', '}
                            {recipient.address_number}
                            {', '}
                            {recipient.address_complement}
                            {', '}
                            {recipient.city}
                            {', '}
                            {recipient.state}
                        </span>
                    </ListMain>
                    <ListActions>
                        <DropdownMenu
                            editFunction={handleEdit}
                            dataForEdit={recipient}
                            deleteFunction={handleDelete}
                            dataForDelete={recipient.id}
                        />
                    </ListActions>
                </List>
            ))}

            <Footer>
                <button
                    disabled={page === 1}
                    type="button"
                    onClick={handleSubtractPage}
                >
                    <MdChevronLeft size={36} color="#444" />
                </button>

                <span>{loading ? 'carregando...' : page}</span>

                <button type="button" onClick={handleAddPage}>
                    <MdChevronRight size={36} color="#444" />
                </button>
            </Footer>
        </>
    );
}

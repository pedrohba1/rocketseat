import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { toast } from 'react-toastify';
import ProblemModal from '~/components/ProblemModal';
import formatString from '~/utils/formatString';

import {
    Title,
    ListHeader,
    ListMain,
    ListActions,
    Footer,
} from '~/styles/default';
import DropdownMenu from '~/components/DropdownMenu';

import { List, Description } from './styles';
import api from '~/services/api';

export default function Problems() {
    const [problems, setProblems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);

    function handleAddPage() {
        setPage(page + 1);
    }

    function handleSubtractPage() {
        setPage(page - 1);
    }

    useEffect(() => {
        async function searchProblems() {
            setLoading(true);
            const response = await api.get('problems', {
                params: {
                    page,
                },
            });

            response.data.map(problem => {
                problem.packageIdDisplay =
                    problem.package_id < 10
                        ? `0${problem.package_id}`
                        : problem.package_id;
                return problem;
            });

            setProblems(response.data);
            setLoading(false);
        }
        searchProblems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    function handleRequestOpen(problem) {
        setModalOpen(true);
        setModalContent({ description: problem.description });
    }

    function handleRequestClose() {
        setModalOpen(false);
    }

    function handleDelete(problemPackageId) {
        api.delete(`problems/${problemPackageId}`)
            .then(() => {
                toast.success('encomenda cancelada com sucesso!');
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    }
    return (
        <>
            <ProblemModal
                closeFunc={handleRequestClose}
                isOpen={isModalOpen}
                problemData={modalContent}
            />

            <Title>Problemas na entrega</Title>

            <List>
                <ListHeader>
                    <span>Encomenda</span>
                </ListHeader>
                <ListHeader>
                    <span>Problema</span>
                </ListHeader>
                <ListHeader>
                    <span>Ações</span>
                </ListHeader>
            </List>

            {problems.map(problem => (
                <List key={String(problem.id)}>
                    <ListMain>
                        <span>#{problem.packageIdDisplay}</span>
                    </ListMain>
                    <ListMain>
                        <Description>
                            {formatString(problem.description, 100)}
                        </Description>
                    </ListMain>
                    <ListActions>
                        <DropdownMenu
                            inProblems
                            dataForView={problem}
                            openModalFunction={handleRequestOpen}
                            dataForDelete={problem.id}
                            deleteFunction={handleDelete}
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

                <span> {loading ? 'carregando...' : page}</span>

                <button type="button" onClick={handleAddPage}>
                    <MdChevronRight size={36} color="#444" />
                </button>
            </Footer>
        </>
    );
}

/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FaGithubAlt, FaSpinner, FaPlus } from 'react-icons/fa';
import { Form, SubmitButton, List, Input, ErrorMessage } from './styles';
import Container from '../../components/Container';
import api from '../../services/api';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        error: false,
    };

    // carregar dados do localStorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    // salva os dados em localStorage
    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;
        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value, error: false });
    };

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({ loading: true });
        const { newRepo, repositories } = this.state;

        try {
            const res = await api.get(`/repos/${newRepo}`);
            const data = {
                name: res.data.full_name,
            };

            if (repositories.indexOf(data)) {
                throw new Error('Repositório duplicado');
            }

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
            });
        } catch (error) {
            if (error.message === 'Repositório duplicado') {
                this.setState({ error: true });
            }

            this.setState({ loading: false });
            return;
        }

        this.setState({ loading: false });
    };

    render() {
        const { newRepo, loading, repositories, error } = this.state;
        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <Input
                        placeholder="adicionar repositorio"
                        value={newRepo}
                        onChange={this.handleInputChange}
                        type="text"
                        error={error}
                    />

                    <SubmitButton loading={loading}>
                        {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#fff" size={14} />
                        )}
                    </SubmitButton>
                </Form>

                {error && <ErrorMessage>repositório duplicado</ErrorMessage>}

                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}

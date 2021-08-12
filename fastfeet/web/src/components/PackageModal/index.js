import React from 'react';
import PropTypes from 'prop-types';

import Moment from 'react-moment';
import 'moment-timezone';

import ReactModal from 'react-modal';

import { Container, Text, Bold } from './styles';

export default function PackageModal({ closeFunc, isOpen, packData }) {
    return (
        <ReactModal
            ariaHideApp={false}
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            isOpen={isOpen}
            data={packData}
            onRequestClose={closeFunc}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                },
                content: {
                    maxWidth: '600px',
                    maxHeight: '500px',
                    border: '1px solid #ccc',
                    background: '#fff',
                    margin: 'auto',
                },
            }}
        >
            <Container>
                <Bold>Informações da encomenda</Bold>

                <Text>
                    <Bold>nome do produto: </Bold>
                    {packData.product}
                </Text>

                <Text>
                    <Bold>endereço: </Bold>
                    {packData.address}, {packData.address_number},{' '}
                    {packData.address_complement}
                </Text>

                <Text>
                    <Bold>cidade: </Bold>
                    {packData.city}
                </Text>

                <Text>
                    <Bold>estado: </Bold>
                    {packData.state}
                </Text>

                <Text>
                    <Bold>CEP: </Bold>
                    {packData.cep}
                </Text>
            </Container>

            <Container>
                <Bold>Datas</Bold>

                {/* TODO: Tem um problema com as datasd aqui, não era pra mostra
                    nada quando as datas estivessem vindo nulas, mas etá mostrando a data do dia */}
                <Text>
                    <Bold>Retirada: </Bold>
                    {packData.start_date ? (
                        <Moment
                            format="DD/MM/YYYY"
                            date={packData.start_date}
                        />
                    ) : (
                        <span>pacote ainda não foi retirado </span>
                    )}
                </Text>
                <Text>
                    <Bold>Entrega: </Bold>
                    {packData.end_date ? (
                        <Moment format="DD/MM/YYYY" date={packData.end_date} />
                    ) : (
                        <span>pacote ainda não foi entregue </span>
                    )}
                </Text>
            </Container>

            <Container>
                <Bold>Assinatura do destinatário</Bold>
                <img src={packData.signature_url} alt="" />
            </Container>
        </ReactModal>
    );
}

PackageModal.propTypes = {
    closeFunc: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    packData: PropTypes.shape({
        product: PropTypes.string,
        address: PropTypes.string,
        address_number: PropTypes.string,
        address_complement: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        cep: PropTypes.string,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        signature_url: PropTypes.string,
    }).isRequired,
};

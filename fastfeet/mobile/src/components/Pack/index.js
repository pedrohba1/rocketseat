import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import formatId from '~/utils/formatId';

import {
    Container,
    Header,
    PackId,
    Label,
    Info,
    Details,
    DeliveryInfo,
    InfoData,
    ProgressBar,
    Line,
    Ball,
    Progress,
    BallLabel,
    BallLabelContainer,
} from './styles';

export default function Pack({ item, onCheckDetails }) {
    const dateFormatted = useMemo(() => {
        return item.updated_at !== null
            ? format(parseISO(item.updated_at), 'dd/MM/yyyy', {
                  locale: pt,
              })
            : 'não retirado';
    }, [item.updated_at]);

    return (
        <Container>
            <Header>
                <Icon name="truck" size={20} color="#7D40E7" />
                <PackId>Encomenda {formatId(item.id)}</PackId>
            </Header>
            <Progress>
                <ProgressBar>
                    <Ball checked />
                    <Line />
                    <Ball checked={item.start_date !== null} />
                    <Line />
                    <Ball checked={item.end_date !== null} />
                </ProgressBar>
                <BallLabelContainer>
                    <BallLabel>Aguardando{'\n'} Retirada</BallLabel>
                    <BallLabel>Retirada</BallLabel>
                    <BallLabel>Entregue</BallLabel>
                </BallLabelContainer>
            </Progress>
            <DeliveryInfo>
                <Info>
                    <Label>Data</Label>
                    <InfoData>{dateFormatted}</InfoData>
                </Info>

                <Info>
                    <Label>Cidade</Label>
                    <InfoData>{item.recipient.city}</InfoData>
                </Info>

                <Info>
                    <TouchableOpacity onPress={() => onCheckDetails(item)}>
                        <Details>Ver detalhes</Details>
                    </TouchableOpacity>
                </Info>
            </DeliveryInfo>
        </Container>
    );
}

Pack.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        updated_at: PropTypes.string,
        end_date: PropTypes.string,
        start_date: PropTypes.string,
        courier: PropTypes.object,
        recipient: PropTypes.object,
        signature: PropTypes.object,
    }).isRequired,
    onCheckDetails: PropTypes.func.isRequired,
};

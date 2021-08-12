import React, { useLayoutEffect, useMemo } from 'react';
import HIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import {
    Container,
    HorizontalContainer,
    HText,
    LabelText,
    Background,
    ContentText,
    TextContainer,
    HTextContainer,
    Buttons,
    Button,
    ButtonText,
} from './styles';

export default function PackDetails({ navigation, route }) {
    const { pack } = route.params;

    const startDateFormatted = useMemo(() => {
        return pack.start_date !== null
            ? format(parseISO(pack.start_date), 'dd/MM/yyyy', {
                  locale: pt,
              })
            : '--/--/--';
    }, [pack.start_date]);

    const endDateFormatted = useMemo(() => {
        return pack.end_date !== null
            ? format(parseISO(pack.end_date), 'dd/MM/yyyy', {
                  locale: pt,
              })
            : '--/--/--';
    }, [pack.end_date]);

    const status = useMemo(() => {
        let statusToReturn;
        if (pack.start_date === null && pack.end_date === null) {
            statusToReturn = 'não retirado';
        }
        if (pack.start_date !== null && pack.end_date === null) {
            statusToReturn = 'pendente';
        }
        if (pack.end_date !== null && pack.end_date !== null) {
            statusToReturn = 'entregue';
        }
        return statusToReturn;
    }, [pack.start_date, pack.end_date]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <HIcon name="chevron-left" size={30} color="#fff" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <Background>
            <Container>
                <HorizontalContainer>
                    <Icon name="truck" size={20} color="#7D40E7" />
                    <HText>Informações de entrega</HText>
                </HorizontalContainer>

                <TextContainer>
                    <LabelText>DESTINATÁRIO</LabelText>
                    <ContentText>{pack.recipient.name}</ContentText>
                </TextContainer>

                <TextContainer>
                    <LabelText>ENDEREÇO DE ENTREGA</LabelText>
                    <ContentText>
                        {pack.recipient.address},{' '}
                        {pack.recipient.address_number},{' '}
                        {pack.recipient.address_complement},{' '}
                        {pack.recipient.city} - {pack.recipient.state},{' '}
                        {pack.recipient.cep}
                    </ContentText>
                </TextContainer>

                <TextContainer>
                    <LabelText>PRODUTO</LabelText>
                    <ContentText>{pack.product}</ContentText>
                </TextContainer>
            </Container>

            <Container>
                <HorizontalContainer>
                    <Icon name="calendar-outline" size={20} color="#7D40E7" />
                    <HText>Situação de entrega</HText>
                </HorizontalContainer>

                <TextContainer>
                    <LabelText>STATUS</LabelText>
                    <ContentText>{status}</ContentText>
                </TextContainer>

                <HTextContainer>
                    <TextContainer>
                        <LabelText>DATA DE RETIRADA</LabelText>
                        <ContentText>{startDateFormatted}</ContentText>
                    </TextContainer>
                    <TextContainer>
                        <LabelText>DATA DE ENTREGA</LabelText>
                        <ContentText>{endDateFormatted}</ContentText>
                    </TextContainer>
                </HTextContainer>
            </Container>

            <Buttons>
                <Container>
                    <Button
                        onPress={() => {
                            navigation.navigate('InformProblem', { pack });
                        }}
                    >
                        <Icon
                            name="close-circle-outline"
                            size={40}
                            color="#E74040"
                        />
                        <ButtonText>Informar{'\n'}Problema</ButtonText>
                    </Button>
                </Container>
                <Container>
                    <Button
                        onPress={() => {
                            navigation.navigate('ViewProblems', { pack });
                        }}
                    >
                        <Icon
                            name="information-outline"
                            size={40}
                            color="#E7BA40"
                        />
                        <ButtonText>Visualizar{'\n'}Problemas</ButtonText>
                    </Button>
                </Container>
                <Container>
                    <Button
                        onPress={() => {
                            navigation.navigate('ConfirmDeliver', { pack });
                        }}
                    >
                        <Icon name="check-circle" size={40} color="#7D40E7" />
                        <ButtonText>Confirmar{'\n'}Entrega</ButtonText>
                    </Button>
                </Container>
            </Buttons>
        </Background>
    );
}

PackDetails.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func,
        setOptions: PropTypes.func,
        navigate: PropTypes.func,
    }).isRequired,
    route: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};

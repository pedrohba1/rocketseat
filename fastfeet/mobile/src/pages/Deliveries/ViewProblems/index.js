import React, { useLayoutEffect, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Background, List, HorizontalContainer, HText } from './styles';

import formatId from '~/utils/formatId';

import api from '~/services/api';

import Problem from '~/components/Problem';

export default function ViewProblems({ navigation, route }) {
    const { pack } = route.params;
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        async function loadProblems() {
            const response = await api.get('problems', {
                params: {
                    package_id: pack.id,
                },
            });
            setProblems(response.data);
        }
        loadProblems();
    }, [pack.id]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Icon name="chevron-left" size={30} color="#fff" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <Background>
            <HorizontalContainer>
                <HText>Encomenda {formatId(pack.id)}</HText>
            </HorizontalContainer>

            <List
                data={problems}
                renderItem={({ item }) => <Problem item={item} />}
                keyExtractor={item => String(item.id)}
            />
        </Background>
    );
}
ViewProblems.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func,
        setOptions: PropTypes.func,
        navigate: PropTypes.func,
    }).isRequired,
    route: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};

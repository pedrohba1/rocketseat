import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import {
    Background,
    Header,
    MsgContainer,
    Name,
    WelcomeMessage,
    Button,
    CourierContainer,
    HContainer,
    DText,
    StatusContainer,
    SearchType,
    List,
} from './styles';

import Picture from '~/components/Picture';
import Pack from '~/components/Pack';
import api from '~/services/api';
import { SignOut } from '~/store/modules/auth/actions';

export default function Dashboard({ navigation }) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [changeLoading, setChangeLoading] = useState(false);
    const profile = useSelector(state => state.user.profile || { name: '' });

    const [packages, setPackages] = useState([]);
    const [currentButton, setCurrentButton] = useState('pending');

    function handleLogout() {
        dispatch(SignOut());
    }

    useEffect(() => {
        async function loadPackages() {
            setLoading(true);
            if (changeLoading || reload) {
                setPage(1);
            }

            const response = await api.get('packages', {
                params: {
                    page,
                    courier_id: profile.id,
                    pending_only: currentButton === 'pending' ? 'yes' : 'no',
                    delivered_only:
                        currentButton === 'delivered' ? 'yes' : 'no',
                    per_page: 5,
                },
            });

            if (changeLoading || reload) {
                setPackages(response.data);
            } else {
                setPackages([...packages, ...response.data]);
            }
            setLoading(false);
            setChangeLoading(false);
            setReload(false);
        }

        loadPackages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentButton, reload, page, profile.id]);

    async function loadMore() {
        setPage(page + 1);
    }

    function handleChange(toButton) {
        if (toButton !== currentButton) {
            setChangeLoading(true);
            setCurrentButton(toButton);
        }
    }
    function handleCheckDetails(pack) {
        navigation.navigate('PackDetails', { pack });
    }

    return (
        <Background>
            <Header>
                <CourierContainer>
                    <Picture src={profile.avatar && profile.avatar.url}>
                        {profile.name}
                    </Picture>
                    <MsgContainer>
                        <WelcomeMessage>Bem vindo de volta,</WelcomeMessage>
                        <Name>{profile.name}</Name>
                    </MsgContainer>
                </CourierContainer>
                <Button onPress={handleLogout}>
                    <Icon name="exit-to-app" size={30} color="#E74040" />
                </Button>
            </Header>

            <HContainer>
                <DText>Entregas</DText>
                <StatusContainer>
                    <TouchableOpacity onPress={() => handleChange('pending')}>
                        <SearchType selected={currentButton === 'pending'}>
                            Pendentes
                        </SearchType>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleChange('delivered')}>
                        <SearchType selected={currentButton === 'delivered'}>
                            Entregues
                        </SearchType>
                    </TouchableOpacity>
                </StatusContainer>
            </HContainer>

            {changeLoading ? (
                <ActivityIndicator size="large" color="#7D40E7" />
            ) : (
                <List
                    data={packages}
                    renderItem={({ item }) => (
                        <Pack onCheckDetails={handleCheckDetails} item={item} />
                    )}
                    onEndReached={() => loadMore()}
                    onEndReachedThreshold={0.05}
                    keyExtractor={item => String(item.id)}
                    ListFooterComponent={
                        loading && (
                            <ActivityIndicator size="large" color="#7D40E7" />
                        )
                    }
                />
            )}
        </Background>
    );
}

Dashboard.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};

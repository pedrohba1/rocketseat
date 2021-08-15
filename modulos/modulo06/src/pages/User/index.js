/* eslint-disable react/static-property-placement */
/* eslint-disable react/state-in-constructor */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

import api from '../../services/api';
import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
} from './styles';

export default class User extends Component {
    static routeParams = ({route}) => ({
        title: route.params.user.name,
    });

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
        route: PropTypes.shape().isRequired,
    };

    state = {
        stars: [],
        loading: true,
        page: 1,
        refreshing: false,
    };

    async componentDidMount() {
        this.load();
    }

    refreshList = () => {
        this.setState({refreshing: true});
    };

    handleNavigate = repo => {
        const {navigation} = this.props;
        navigation.navigate('Repository', {repo});
    };

    load = async (page = 1) => {
        const {stars} = this.state;
        const {route} = this.props;
        const {user} = route.params;

        const response = await api.get(`/users/${user.login}/starred`, {
            params: {page},
        });

        this.setState({
            stars: page >= 2 ? [...stars, ...response.data] : response.data,
            page,
            loading: false,
            refreshing: false,
            loadingStars: false,
        });
    };

    refreshList = () => {
        this.setState({refreshing: true, stars: []}, this.load);
    };

    loadMore = async () => {
        this.setState({loadingStars: true});

        const {page} = this.state;

        const nextPage = page + 1;

        await this.load(nextPage);
        this.setState({loadingStars: false});
    };

    render() {
        const {route} = this.props;
        const {user} = route.params;
        const {stars, loading, refreshing, loadingStars} = this.state;

        return (
            <Container>
                <Header>
                    <Avatar source={{uri: user.avatar}} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>

                {loading ? (
                    <ActivityIndicator color="#fff" size={100} />
                ) : (
                    <Stars
                        onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
                        onEndReached={this.loadMore} // Função que carrega mais itens
                        onRefresh={this.refreshList}
                        refreshing={refreshing}
                        data={stars}
                        keyExtractor={star => String(star.id)}
                        renderItem={({item}) => (
                            <Starred onPress={() => this.handleNavigate(item)}>
                                <OwnerAvatar
                                    source={{
                                        uri: item.owner.avatar_url,
                                    }}
                                />
                                <Info>
                                    <Title>{item.name}</Title>
                                    <Author>{item.owner.login}</Author>
                                </Info>
                            </Starred>
                        )}
                    />
                )}
                {loadingStars && (
                    <ActivityIndicator color="#7159c1" size={20} />
                )}
            </Container>
        );
    }
}

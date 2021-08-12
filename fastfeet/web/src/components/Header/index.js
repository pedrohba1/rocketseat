import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Content, Option, Right, Left, Logout } from './styles';
import logo from '~/assets/fastfeet-logo.png';

import { changeTab } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
    const currentTab = useSelector(state => state.user.tab);
    const dispatch = useDispatch();

    function handleTabChange(newTab) {
        switch (newTab) {
            case 'couriers':
                dispatch(changeTab('couriers'));
                break;
            case 'packages':
                dispatch(changeTab('packages'));
                break;
            case 'recipients':
                dispatch(changeTab('recipients'));
                break;
            case 'problems':
                dispatch(changeTab('problems'));
                break;
            default:
                break;
        }
    }

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <Container>
            <Content>
                <Left>
                    <img src={logo} alt="fastFeet" />
                    <Option
                        onClick={() => handleTabChange('packages')}
                        isSelected={
                            currentTab === 'packages' ||
                            currentTab === 'register/package' ||
                            currentTab === 'edit/package'
                        }
                    >
                        <strong>ENCOMENDAS</strong>
                    </Option>
                    <Option
                        onClick={() => handleTabChange('couriers')}
                        isSelected={
                            currentTab === 'couriers' ||
                            currentTab === 'register/courier' ||
                            currentTab === 'edit/courier'
                        }
                    >
                        <strong>ENTREGADORES</strong>
                    </Option>
                    <Option
                        onClick={() => handleTabChange('recipients')}
                        isSelected={
                            currentTab === 'recipients' ||
                            currentTab === 'register/recipient' ||
                            currentTab === 'edit/recipient'
                        }
                    >
                        <strong>DESTINATÁRIOS</strong>
                    </Option>
                    <Option
                        onClick={() => handleTabChange('problems')}
                        isSelected={currentTab === 'problems'}
                    >
                        <strong>PROBLEMAS</strong>
                    </Option>
                </Left>
                <Right>
                    <strong>Admin fastFeet</strong>
                    <Logout onClick={handleSignOut}>Sair do sistema</Logout>
                </Right>
            </Content>
        </Container>
    );
}

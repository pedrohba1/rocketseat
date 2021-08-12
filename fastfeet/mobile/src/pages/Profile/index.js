import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Background, Label, Content, TextContainer, Bottom } from './styles';

import Picture from '~/components/Picture';
import Button from '~/components/Button';
import { SignOut } from '~/store/modules/auth/actions';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(
        state => state.user.profile || { name: '', createdAt: null }
    );

    const createdDateFormatted = useMemo(() => {
        return profile.createdAt !== null
            ? format(parseISO(profile.createdAt), 'dd/MM/yyyy', {
                  locale: pt,
              })
            : '--/--/--';
    }, [profile.createdAt]);

    function handleLogout() {
        dispatch(SignOut());
    }

    return (
        <Background>
            <Picture size={130} src={profile.avatar && profile.avatar.url}>
                {profile.name}
            </Picture>

            <Bottom>
                <TextContainer>
                    <Label>Nome completo</Label>
                    <Content>{profile.name}</Content>
                </TextContainer>

                <TextContainer>
                    <Label>Email</Label>
                    <Content>{profile.email}</Content>
                </TextContainer>

                <TextContainer>
                    <Label>Data de cadastro</Label>
                    <Content>{createdDateFormatted}</Content>
                </TextContainer>
                <Button onPress={() => handleLogout()} color="#E74040">
                    Logout
                </Button>
            </Bottom>
        </Background>
    );
}

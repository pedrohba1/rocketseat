import styled from 'styled-components/native';

export const Background = styled.SafeAreaView`
    background: #ffffff;
    flex: 1;
    padding: 10px;
`;

export const Header = styled.View`
    align-self: stretch;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;

export const HContainer = styled.View`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;

export const CourierContainer = styled.View`
    display: flex;
    flex-direction: row;
`;

export const MsgContainer = styled.View`
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Name = styled.Text`
    color: #444444;
    font-weight: bold;
    font-size: 22px;
`;

export const WelcomeMessage = styled.Text`
    color: #666666;
`;

export const Button = styled.TouchableOpacity`
    align-self: center;
`;

export const DText = styled.Text`
    color: #444444;
    font-size: 22px;
    font-weight: bold;
`;

export const StatusContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-self: center;
`;

export const SearchType = styled.Text`
    margin-left: 5px;
    font-weight: bold;
    display: flex;
    align-self: center;
    color: ${props => (props.selected ? '#7D40E7' : '#999999')};
    text-decoration: ${props => (props.selected ? 'underline' : 'none')};
`;

export const List = styled.FlatList.attrs({
    showVerticalScrollIndicator: false,
})``;

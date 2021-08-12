import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';

export const ButtonContainer = styled.View`
    margin-top: 10px;
    display: flex;
`;

export const Background = styled.View`
    padding: 20px;
    flex: 1;
    flex-direction: column;
    background-color: #fff;
`;

export const CameraContainer = styled.View`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-self: center;
    width: 100%;
    flex: 1;
    background: black;
`;

export const Camera = styled(RNCamera)`
    background: black;
    display: flex;
    flex: 1;
    align-self: center;
    justify-content: flex-end;
`;

export const CameraButton = styled.TouchableOpacity`
    margin-bottom: 5px;
    opacity: 0.5;
    color: black;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: black;
    align-self: center;
    justify-content: center;
    align-items: center;
`;

export const Img = styled.Image`
    flex: 1;
`;

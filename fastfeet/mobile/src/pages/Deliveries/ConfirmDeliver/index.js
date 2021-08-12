import React, { useLayoutEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import PropTypes from 'prop-types';
import api from '~/services/api';

import {
    CameraButton,
    ButtonContainer,
    CameraContainer,
    Background,
    Camera,
    Img,
} from './styles';

import Button from '~/components/Button';

export default function ConfirmDeliver({ navigation, route }) {
    const { pack } = route.params;

    const [picture, setPicture] = useState(
        pack.signature ? pack.signature.url : ''
    );

    let camera;

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

    async function ConfirmDelivery() {
        try {
            const data = new FormData();
            data.append('file', {
                uri: picture,
                name: 'confirmed_delivery.png',
                type: 'image/jpg',
            });

            const response = await api.post('files', data);
            const { id } = response.data;
            await api.post('courier/end', {
                signature_id: id,
                package_id: pack.id,
                courier_id: pack.courier.id,
            });
            await Alert.alert('Sucesso!', 'entrega registrada com sucesso!');
            navigation.navigate('Dashboard');
        } catch (err) {
            if (err.response) {
                Alert.alert('Erro', err.response.data.error);
            } else if (!picture) {
                Alert.alert('Erro', 'você não retirou uma foto ainda');
            }
        }
    }

    async function takePicture() {
        try {
            if (camera) {
                const options = { quality: 0.5, base64: true };
                const camData = await camera.takePictureAsync(options);
                setPicture(camData.uri);
            }
        } catch (err) {
            Alert.alert('Erro', 'erro ao registrar imagem');
        }
    }

    return (
        <Background>
            <CameraContainer>
                {picture ? (
                    <Img
                        source={{
                            uri: picture,
                        }}
                    />
                ) : (
                    <Camera
                        ref={ref => {
                            camera = ref;
                        }}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        androidCameraPermissionOptions={{
                            title: 'Permissão para usar a câmera',
                            message:
                                'Nós precisamos da sua permissão para tirar a foto',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancelar',
                        }}
                    >
                        <CameraButton onPress={() => takePicture()}>
                            <Icon name="camera-alt" size={30} color="#fff" />
                        </CameraButton>
                    </Camera>
                )}
            </CameraContainer>

            {!pack.signature && (
                <ButtonContainer>
                    <Button onPress={() => ConfirmDelivery()} color="#7D40E7">
                        Enviar
                    </Button>
                </ButtonContainer>
            )}
        </Background>
    );
}

ConfirmDeliver.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func,
        setOptions: PropTypes.func,
        navigate: PropTypes.func,
    }).isRequired,
    route: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import pic from '~/assets/defaultPic.png';

export default function AvatarInput({ preview, handleFileChange }) {
    return (
        <Container>
            <label htmlFor="avatar">
                <img src={preview || pic} alt="imagem" />

                <input
                    type="file"
                    id="avatar"
                    accept="img/*"
                    onChange={handleFileChange}
                />
            </label>
        </Container>
    );
}

AvatarInput.propTypes = {
    preview: PropTypes.string.isRequired,
    handleFileChange: PropTypes.func.isRequired,
};

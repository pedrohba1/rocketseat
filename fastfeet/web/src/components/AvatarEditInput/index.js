import React from 'react';
import PropTypes from 'prop-types';

import { Container, ImageContainer } from './styles';
import getInitials from '~/utils/getInitials';

export default function AvatarEditInput({ name, handleFileChange }) {
    return (
        <Container>
            <label htmlFor="avatar">
                <ImageContainer>
                    <span>{name && getInitials(name)}</span>
                </ImageContainer>

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

AvatarEditInput.propTypes = {
    handleFileChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

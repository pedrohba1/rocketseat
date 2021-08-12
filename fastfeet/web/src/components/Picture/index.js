import React from 'react';
import PropTypes from 'prop-types';
import { Container, Img, Default, colors } from './styles';
import getInitials from '~/utils/getInitials';

export default function Picture({ src, name }) {
    return (
        <Container>
            {src !== null ? (
                <Img src={src} />
            ) : (
                <Default
                    color={colors[Math.floor(Math.random() * colors.length)]}
                >
                    <span>{name && getInitials(name)}</span>
                </Default>
            )}
        </Container>
    );
}

Picture.defaultProps = {
    src: '',
};

Picture.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string.isRequired,
};

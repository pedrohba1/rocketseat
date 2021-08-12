import React from 'react';
import PropTypes from 'prop-types';
import { Container, Img, Name } from './styles';

export default function Picture({ src, children, size }) {
    function getInitials(string) {
        const names = string.split(' ');
        let initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    }

    return (
        <Container size={size}>
            {src ? (
                <Img
                    size={size}
                    source={{
                        uri: src,
                    }}
                />
            ) : (
                <Name size={size}>{getInitials(children)}</Name>
            )}
        </Container>
    );
}

Picture.defaultProps = {
    src: '',
    children: '',
    size: 60,
};

Picture.propTypes = {
    src: PropTypes.string,
    children: PropTypes.string,
    size: PropTypes.number,
};

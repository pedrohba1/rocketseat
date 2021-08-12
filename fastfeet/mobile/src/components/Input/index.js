import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TInput } from './styles';

function Input({ style, icon, ...rest }, ref) {
    return (
        <Container style={style}>
            {icon && <Icon name={icon} size={20} color="#444" />}
            <TInput {...rest} ref={ref} />
        </Container>
    );
}

export default forwardRef(Input);

Input.defaultProps = {
    icon: null,
    style: {},
};

Input.propTypes = {
    icon: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

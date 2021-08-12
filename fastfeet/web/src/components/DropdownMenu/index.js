import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';

import {
    Container,
    ActionButton,
    ActionIcon,
    OptionList,
    Option,
} from './styles';

export default function DropdownMenu({
    inPackages,
    inProblems,
    dataForView,
    openModalFunction,
    dataForEdit,
    editFunction,
    dataForDelete,
    deleteFunction,
}) {
    const [visible, setVisible] = useState(false);

    function handleToggleVisible() {
        setVisible(!visible);
    }

    return (
        <Container>
            <ActionButton onClick={handleToggleVisible}>
                <ActionIcon />
            </ActionButton>

            <OptionList
                inProblems={inProblems}
                visible={visible}
                onMouseLeave={handleToggleVisible}
            >
                {(inPackages || inProblems) && (
                    <Option>
                        <IoMdEye color="#8E5BE8" />
                        <button
                            onClick={() => openModalFunction(dataForView)}
                            type="button"
                        >
                            Visualizar
                        </button>
                    </Option>
                )}

                {!inProblems && (
                    <Option>
                        <MdEdit color="#4D85EE" />
                        <button
                            onClick={() => editFunction(dataForEdit)}
                            type="button"
                        >
                            Editar
                        </button>
                    </Option>
                )}

                <Option>
                    <MdDeleteForever color="#DE3B3B" />
                    <button
                        type="button"
                        onClick={() => deleteFunction(dataForDelete)}
                    >
                        {inProblems ? 'Cancelar encomenda' : 'Excluir'}
                    </button>
                </Option>
            </OptionList>
        </Container>
    );
}

DropdownMenu.defaultProps = {
    inPackages: false,
    inProblems: false,
    dataForView: null,
    dataForEdit: null,
    editFunction: null,
    openModalFunction: null,
    dataForDelete: null,
    deleteFunction: null,
};

DropdownMenu.propTypes = {
    inProblems: PropTypes.bool,
    inPackages: PropTypes.bool,
    openModalFunction: PropTypes.func,
    dataForView: PropTypes.oneOfType([PropTypes.object]),
    dataForEdit: PropTypes.oneOfType([PropTypes.object]),
    editFunction: PropTypes.func,
    dataForDelete: PropTypes.number,
    deleteFunction: PropTypes.func,
};

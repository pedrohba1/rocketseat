import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { ProblemContainer, ProblemDate, ProblemDescription } from './styles';

export default function Problem({ item }) {
    const dateFormatted = useMemo(() => {
        return item.createdAt !== null
            ? format(parseISO(item.createdAt), 'dd/MM/yyyy', {
                  locale: pt,
              })
            : '--/--/--';
    }, [item.createdAt]);

    return (
        <ProblemContainer>
            <ProblemDescription>{item.description}</ProblemDescription>
            <ProblemDate>{dateFormatted}</ProblemDate>
        </ProblemContainer>
    );
}

Problem.propTypes = {
    item: PropTypes.shape({
        createdAt: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
};

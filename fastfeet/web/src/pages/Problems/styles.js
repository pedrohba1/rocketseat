import styled from 'styled-components';

export const List = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
`;

export const Description = styled.span.attrs({})`
    justify-content: flex-start;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
`;

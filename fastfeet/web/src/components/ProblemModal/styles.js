import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    & + div {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #eeeeee;
    }
`;

export const Bold = styled.span`
    font-weight: bold;
    color: #444444 !important;
`;

export const Text = styled.span`
    color: #666666;
`;

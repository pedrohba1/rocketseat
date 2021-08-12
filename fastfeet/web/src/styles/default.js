import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';
import { darken } from 'polished';

export const Title = styled.h1`
    color: #444444;
`;

export const Search = styled(Input).attrs({
    icon: { name: 'search' },
})`
    display: flex;
    width: 300px;
`;

export const SearchIcon = styled(MdAdd).attrs({
    size: 20,
})`
    vertical-align: middle;
`;

export const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const NoData = styled.div`
    margin-top: 20px;
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 1fr;
`;

export const ListHeader = styled.div`
    padding: 10px;
    padding-bottom: 0px;

    span {
        color: #444444;
        font-size: 20px;
    }
    &:last-of-type {
        text-align: right;
    }

    height: auto;
    font-weight: bold;
`;

export const ListMain = styled.main`
    border-radius: 4px;
    padding: 10px;

    overflow: hidden;
    text-overflow: ellipsis;

    background: #ffffff;
    height: 57px;
    display: flex;

    span {
        display: flex;
        overflow: hidden;
        text-overflow: ellipsis;
        justify-content: flex-start;
        text-align: left;
        align-self: center;
    }
`;

export const RegisterButton = styled.button`
    display: flex;
    height: 36px;
    vertical-align: middle;

    span {
        display: flex;
        align-self: center;
    }

    &:hover {
        background: ${darken(0.1, '#7d40e7')};
    }

    color: #ffffff;
    background: #7d40e7;
    border: 0;
    padding: 0 10px;
    font-weight: bold;
    border-radius: 4px;
`;

export const ActionButton = styled.button`
    display: flex;
    float: right;
    border: 0;
    background: none;
`;

export const ActionIcon = styled(MdMoreHoriz).attrs({
    size: 25,
})`
    color: #c6c6c6;
`;

export const ListActions = styled.main`
    display: flex;
    border-radius: 4px;
    padding: 10px;
    align-content: center;
    background: #ffffff;
    justify-content: flex-end;
    height: 57px;
`;

export const Picture = styled.img`
    border-radius: 50%;
    width: 35px;
    height: 35px;
`;

export const DefaultPic = styled.div`
    display: flex;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background: #f4effc;
    align-self: center;
    justify-content: center;
    span {
        color: ${props => props.color};
    }
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
        padding: 20px;
        border: none;
        background: none;
    }

    span {
        font-size: 30px;
        color: #444;
        align-self: center;
    }
`;

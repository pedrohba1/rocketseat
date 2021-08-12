import styled from 'styled-components';

export const List = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;

    span {
        align-self: center;
    }
`;

export const CheckBox = styled.div`
    border: 1px solid #ddd;
    margin-left: 5px;
    width: 15px;
    height: 15px;
    padding: 10px;

    background: ${props => (props.checked ? '#7d40e7' : '#fff')};
    border-radius: 50%;
    transition: all 150ms;
`;

export const VerticalContainer = styled.div`
    display: flex;
    flex-direction: column;

    span {
        align-self: center;
    }
`;

export const Status = styled.span`
    display: flex;
    font-weight: bold;
    padding: 5px;
    border-radius: 12px;

    figure {
        display: flex;
        align-self: center;
        border-radius: 50%;
        height: 7px;
        width: 7px;
        margin: 0 5px;
    }

    ${props => {
        switch (props.status) {
            case 'ENTREGUE':
                return `
                color: #2ca42b;
                background: #dff0df;
                figure{
                    background-color: #2ca42b;
                };
                `;
            case 'PENDENTE':
                return `
                color: #C1BC35;
                background: #F0F0DF;
                figure{
                    background: #C1BC35;
                }
                `;
            case 'RETIRADA':
                return `
                color: #4D85EE;
                background: #BAD2FF;

                figure{
                    background: #4D85EE;
                }
                `;

            case 'CANCELADA':
                return `
                color: #DE3B3B;
                background: #FAB0B0;

                figure{
                    background: #DE3B3B;
                }
                `;

            default:
        }
    }}
`;

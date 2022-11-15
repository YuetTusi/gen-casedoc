import styled from 'styled-components';

export const FooterBox = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &>.l{
        flex:1;
        display: flex;
        margin-right: 15px;
        &>label{
            flex:none;
        }
    }
    &>.r{
        flex:none;
    }
`;
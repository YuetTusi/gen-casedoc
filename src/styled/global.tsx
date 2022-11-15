import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    html{
        font-size: 62.5%;
        margin: 0;
        padding: 0;
        width: auto;
        height: 100%;
    }
    body{
        position: relative;
        margin: 0;
        padding: 0;
        width: auto;
        height: 100%;
    }

    .zero-padding-modal{
        .ant-modal-body{
            padding: 0 !important;
        }
    }
`;
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle<{theme: any}>`
    body {
        color: #495057;
        background-color: #FAFAFA;
        font-size: 1rem;
        font-weight: 400;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        line-height: 1.5em;
        word-break: break-word;
    }

    html, body, #root {
        height: 100%;
        width: 100%;
        margin:0;
    }
    
    * {
        box-sizing: border-box;
    }

    input, button, textarea {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }
    
    a {
        color: ${({theme}) => theme.palette.sky1};
        text-decoration: none;
    }

    img {
        max-width: 100%;
        display: block;
        margin: 0 auto;
    }

    figure {
        margin-top: 2rem;
        margin-bottom: 1rem;
        margin-left: 0;
        margin-right: 0;
    }

    figcaption {
        margin-top: 0.75rem;
        text-align: center;
        font-size: 0.875rem;
        font-weight: 400;
        color: ${({theme}) => theme.palette.gray6};
    }

    h1 {
        margin: 48px 0 24px;
        word-break: break-all;
    }

    h2 {
        margin: 40px 0 16px;
        word-break: break-all;
    }
  
    h3 {
        margin: 32px 0 16px;
        word-break: break-all;
    }
    
    h4 {
        margin: 24px 0 8px;
        word-break: break-all;
    }

    h5 {
        margin: 16px 0 16px;
        word-break: break-all;
    }

    table {
        border-collapse: collapse;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }

    th,td{
        border: none !important;
        padding: 4px 8px;
        //border-left: 1px solid ${({theme}) => theme.palette.gray3} !important;
    }

    tr:hover {
        background-color: #f5f5f5;
    }

    th{
        background-color: ${({theme}) => theme.palette.gray9} !important;
        color: #FDFDFD !important;
    }

    th:nth-child(1),td:nth-child(1){
        border-left: none !important;
    }

    td{
        border-bottom: 1px solid ${({theme}) => theme.palette.gray3} !important;
    }

    tr:last-child td{
        border-bottom: 2px solid ${({theme}) => theme.palette.gray7} !important;
    }
`;

export default GlobalStyles;
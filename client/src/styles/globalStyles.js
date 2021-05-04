import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body {
        color: #495057;
        background-color: #FAFAFA;
        fontSize: 1rem;
        fontWeight: 400;
        fontFamily: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        lineHeight: 1.5em;
    }

    input, button, textarea {
        font-family: inherit;
    }
    
    html, body, #root {
        height: 100%;
    }

`;

export default GlobalStyles;
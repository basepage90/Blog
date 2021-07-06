import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body {
        color: #495057;
        background-color: #FAFAFA;
        font-size: 1rem;
        font-weight: 400;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        line-height: 1.5em;
    }
    
    input, button, textarea {
        font-family: inherit;
    }
 
    html, body, #root {
        height: 100%;
    }
    
    img {
        max-width: 100%;
        display: block;
        margin: 0 auto;
    }
`;

export default GlobalStyles;
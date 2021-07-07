import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body {
        color: #495057;
        background-color: #FAFAFA;
        font-size: 1rem;
        font-weight: 400;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        line-height: 1.5em;
        word-break: break-word;
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
`;

export default GlobalStyles;
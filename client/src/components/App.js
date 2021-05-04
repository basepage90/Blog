import React from 'react';
import Router from './Router';
import { ThemeProvider } from 'styled-components';
import { StylesProvider} from '@material-ui/styles';
import theme from "styles/theme/theme";
import GlobalStyles from "styles/globalStyles";


function App() {

  return (
    <>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme} >
        <Router/>
        <GlobalStyles/>
      </ThemeProvider>
    </StylesProvider>
    </>
  );
}

export default App;



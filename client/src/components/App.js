import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StylesProvider} from '@material-ui/styles';
import theme from "styles/theme/theme";
import GlobalStyles from "styles/globalStyles";
import HomePage from "pages/home/HomePage"


function App() {

  return (
    <>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme} >
        <HomePage />
        <GlobalStyles/>
      </ThemeProvider>
    </StylesProvider>
    </>
  );
}

export default App;



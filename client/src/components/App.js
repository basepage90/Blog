import React from 'react';
import { StylesProvider} from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import theme from "styles/theme/theme";
import GlobalStyles from "styles/globalStyles";
import BlogPage from "pages/blogPage/BlogPage"
import MarkdownWriter from 'containers/mde/MarkdownWriter';

import styled from 'styled-components';
import {Button} from '@material-ui/core';

const StButton = styled(Button)`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
`;

function App() {


  return (
    <>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme} >
        <SnackbarProvider maxSnack={3} action={() => ( <StButton /> )} >
          <BrowserRouter>
            <Switch>
              <Route path="/write" exact component={MarkdownWriter} />
              <Route path="/edit/:id" exact component={MarkdownWriter} />
              <Route component={BlogPage} />
            </Switch>
          </BrowserRouter>
          <GlobalStyles/>
        </SnackbarProvider>
      </ThemeProvider>
    </StylesProvider>
    </>
  );
}

export default App;
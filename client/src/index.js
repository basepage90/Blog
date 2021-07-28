import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'components/App';
import store from 'store/store';
import { ApolloProvider } from '@apollo/react-hooks';
import client from 'gql/Apollo'
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
  <HelmetProvider>
    <Provider store={store}>
      <ApolloProvider client={client} >
        <App />
      </ApolloProvider>
    </Provider>
  </HelmetProvider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'components/App';
import store from 'store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider } from '@apollo/react-hooks';
import client from 'gql/Apollo'



ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client} >
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);


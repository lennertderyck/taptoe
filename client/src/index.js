import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  ApolloProvider,
} from "@apollo/client";
import App from './App';

import './sass/index.scss'
import { AuthProvider } from './contexts/AuthContext';
import { AccountModule, LoginModule, NewTribeModule, TribeDetailModule, TribeModule } from './modules';
import client from './graphql/client';
import { HelpSidebar } from './components';
import { HelpProvider } from './contexts/HelpContext';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <HelpProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="account" element={<AccountModule />}>
                {/* <Route path="profile" element={<App />} />
                <Route path="settings" element={<App />} /> */}
              </Route>
              <Route path="/account/login" element={<LoginModule />} />
              <Route path="tribes" element={<TribeModule />}>
                <Route path="nieuw" element={<NewTribeModule />}/>
                <Route path=":id" element={<TribeDetailModule />}/>
              </Route>
              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </BrowserRouter>
          <HelpSidebar />
        </HelpProvider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  ApolloProvider,
} from "@apollo/client";
import App from './App';

import './sass/index.scss'
import { AuthProvider } from './contexts/AuthContext';
import { AccountModule, LocationDetailModule, LocationEditModule, LocationModule, LoginModule, ManageModule, ManageOverviewModule, ManageUserRolesModule, ManageUsersModule, ManageWrapperModule, NewLocationModule, NewTribeModule, TribeDetailModule, TribeModule } from './modules';
import client from './graphql/client';
import { HelpSidebar, Splash, SpotlightSearch } from './components';
import { HelpProvider } from './contexts/HelpContext';
import { SplashProvider, AppContextProvider} from './contexts';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelpProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppContextProvider>
            <SplashProvider>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="account" element={<AccountModule />}>
                  {/* <Route path="profile" element={<App />} />
                  <Route path="settings" element={<App />} /> */}
                </Route>
                <Route path="account/login" element={<LoginModule />} />
                <Route path="tribes" element={<TribeModule />}>
                  <Route path="nieuw" element={<NewTribeModule />}/>
                  <Route path=":id" element={<TribeDetailModule />}/>
                </Route>
                <Route path="locaties" element={<LocationModule />}>
                  <Route path="nieuw/:tribeId" element={<NewLocationModule />} />
                  <Route path="nieuw" element={<NewLocationModule />} />
                  {/* <Route path=":id" element={<LocationDetailModule />} /> */}
                  {/* <Route path=":id" element={<App />} /> */}
                </Route>
                <Route path="locaties/:id" element={<LocationDetailModule />} />
                <Route path="locaties/:id/edit" element={<LocationEditModule />} />
                <Route path="manage" element={<ManageModule />}>
                  <Route index element={<ManageOverviewModule />} />
                  <Route path="*" element={<ManageWrapperModule />}>
                    <Route path="users">
                      <Route index element={<ManageUsersModule />} />
                      <Route path="roles" element={<ManageUserRolesModule />} />
                    </Route>
                  </Route>
                </Route>
                <Route path="*" element={<div>Not found</div>} />
              </Routes>
            </SplashProvider>
            
            <HelpSidebar />
            {/* <SpotlightSearch /> */}
          </AppContextProvider>
        </AuthProvider>
      </BrowserRouter>
      </HelpProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

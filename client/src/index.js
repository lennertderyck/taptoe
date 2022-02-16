import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  ApolloProvider,
} from "@apollo/client";
import App from './App';

import './sass/index.scss'
import { AuthProvider } from './contexts/AuthContext';
import { AccountModule, LocationDetailModule, LocationEditModule, LocationModule, LoginModule, ManageModule, ManageOverviewModule, ManageTribesModule, ManageUserRolesModule, ManageUsersModule, ManageWrapperModule, NewLocationModule, NewTribeModule, TribeDetailModule, TribeModule } from './modules';
import client from './graphql/client';
import { HelpSidebar, Icon, Splash, SpotlightSearch } from './components';
import { HelpProvider } from './contexts/HelpContext';
import { SplashProvider, AppContextProvider} from './contexts';
import { ReactComponent as Logo } from './assets/logo.svg';
import { ReactComponent as LogoJung } from './assets/logos_credits/logo_jung_hinged.svg';


ReactDOM.render(
  <React.StrictMode>
    { process.env.NODE_ENV === 'production' ? (
      <div className="h-full w-full flex flex-col items-center justify-center bg-[#E7ECEB]">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <Logo width="120px" className="mx-auto mb-4" />
          <h2 className="font-display font-medium text-4xl text-center mb-1 text-tt-emerald-500">Eenvoudig lokalen en terreinen,<br/>huren of verhuren</h2>
        </div>
        
        <div className="pt-8 px-8 pb-6">
          <Icon name="seedling" size="1.8rem" color="currentColor" className="mx-auto text-tt-emerald-500" />
          <h2 className="lowercase font-display text-xl text-center text-tt-emerald-700">Nog even geduld</h2>
          <h3 className="text-center  text-tt-emerald-700">Taptoe is beschikbaar vanaf de zomer van 2022!</h3>
          
          <div className="mt-4 text-gray-400 text-center">
              Design &amp; development door <a href="https://jung.gent?ref=taptoe" target="_blank" rel="noopener">
                  <LogoJung height="20px" className="inline-block mx-1 text-gray-400" fill="currentColor" />
              </a> en <a href="https://stefverlinde.be?ref=taptoe" target="_blank" rel="noopener">Stef Verlinde</a>
          </div>
        </div>
      </div>
    ): (
      <ApolloProvider client={client}>
        <HelpProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppContextProvider>
              <SplashProvider>
                <Routes>
                  <Route path="/" element={<App />} />
                    <Route path="account" element={<AccountModule />}>
                  </Route>
                  <Route path="account/login" element={<LoginModule />} />
                  <Route path="tribes" element={<TribeModule />}>
                    <Route path="nieuw" element={<NewTribeModule />}/>
                    <Route path=":id" element={<TribeDetailModule />}/>
                  </Route>
                  <Route path="locaties" element={<LocationModule />}>
                    <Route path="nieuw/:tribeId" element={<NewLocationModule />} />
                    <Route path="nieuw" element={<NewLocationModule />} />
                  </Route>
                  <Route path="locaties/:id" element={<LocationDetailModule />} />
                  <Route path="locaties/:id/edit" element={<LocationEditModule />} />
                  <Route path="manage" element={<ManageModule />}>
                    <Route index element={<ManageOverviewModule />} />
                    <Route path="*" element={<ManageWrapperModule />}>
                      <Route path="tribes" element={<ManageTribesModule />} />
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
    )}
  </React.StrictMode>,
  document.getElementById('root')
);

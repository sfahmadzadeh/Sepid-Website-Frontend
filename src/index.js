import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reduxStore from './redux/store';
import { initSupportingThirdPartyApps } from 'configs/SupportingThirdPartyApps';
import { GoogleOAuthProvider } from '@react-oauth/google';

initSupportingThirdPartyApps();

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
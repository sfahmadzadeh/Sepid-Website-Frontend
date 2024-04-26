import * as Sentry from "@sentry/react";
import TagManager from 'react-gtm-module'
import ReactGA from "react-ga4";
import { getPersistedState } from 'redux/store';

const initSentry = () => {
  const userInfo = getPersistedState().userInfo;
  if (userInfo) {
    Sentry.setUser({ id: userInfo.id, username: userInfo.username, email: userInfo.email });
  } else {
    Sentry.setUser(null);
  }
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DNS,
    tracesSampleRate: 1.0,
    release: 'production',
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,
    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,
  });
}

const initGoogleAnalytics = () => {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID);
}

const initGoogleTagManager = () => {
  TagManager.initialize({
    gtmId: process.env.REACT_APP_GTM_ID
  });
}

const initClarity = () => {
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", process.env.REACT_APP_CLARITY_TOKEN);
}

const initGoftino = (token: string) => {
  if (!token) return;
  (function () {
    var t = token, w = window, d = document;
    function g() {
      const g = d.createElement('script');
      const s = 'https://www.goftino.com/widget/' + t;
      const l = localStorage.getItem('goftino_' + t);
      g.async = !0;
      g.src = l ? s + '?o=' + l : s;
      d.getElementsByTagName('head')[0].appendChild(g);
    }
    'complete' === d.readyState ? g() : w.addEventListener('load', g, !1);
  })();
}

export const initSupportingThirdPartyApps = (thridPartiesTokens: any[]) => {
  if (process.env.NODE_ENV === 'production') {
    initGoftino(thridPartiesTokens.find(thirdParty => thirdParty.third_party_type == 'SiteSupportService')?.token);
    initSentry();
    initGoogleAnalytics();
    initGoogleTagManager();
    initClarity();
  }
}

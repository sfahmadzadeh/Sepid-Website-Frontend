import Parse from 'parse';
import { IMS_SERVER_URL, IMS_LIVE_QUERY_SERVER_URL } from 'configs/Constants';

export const initParseServer = () => {
  Parse.initialize(process.env.REACT_APP_APPLICATION_ID, process.env.REACT_APP_JAVASCRIPT_KEY);
  Parse.serverURL = IMS_SERVER_URL;
  Parse.liveQueryServerURL = IMS_LIVE_QUERY_SERVER_URL;
};

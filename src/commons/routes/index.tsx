import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ResetPassword from 'apps/website-display/pages/ResetPassword';
import CreateAccount from 'apps/website-display/pages/CreateAccount';
import RegistrationReceipt from 'apps/website-display/pages/RegistrationReceipt';
import Programs from 'apps/website-display/pages/Programs';
import Setting from 'apps/website-display/pages/Setting';
import Program from 'apps/website-display/pages/Program';
import ProgramManagement from 'apps/website-display/pages/ProgramManagement';
import NotFoundPage from 'apps/website-display/pages/Message/NotFoundPage';
import Login from 'apps/website-display/pages/Login';
import FailedPayment from 'apps/website-display/pages/Message/FailedPayment';
import SuccessfulPayment from 'apps/website-display/pages/Message/SuccessfulPayment';
import Registration from 'apps/website-display/pages/Registration';
import TeamSetting from 'apps/website-display/pages/TeamSetting';
import FSM from 'apps/website-display/pages/FSM';
import Article from 'apps/website-display/pages/Article';
import Articles from 'apps/website-display/pages/Articles';
import PrivateRoute from './PrivateRoute';
import FSMManagement from 'apps/website-display/pages/FSMManagement';
import Correction from 'apps/website-display/pages/Correction';
import EditArticle from 'apps/website-display/pages/EditArticle';
import WebsiteManagement from 'apps/website-factory/pages/WebsiteManagement';
import ProfilePage from 'apps/website-display/pages/Profile';

const Root = () => {

  return (
    <Routes>

      <Route path="/" element={<Navigate to={'/programs/'} />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/reset-password/" element={<ResetPassword />} />
      <Route path="/create-account/" element={<CreateAccount />} />
      <Route path="/articles/" element={<Articles />} />
      <Route path="/article/:articleId/" element={<Article />} />
      <Route path="/programs/" element={<Programs />} />
      <Route path="/profile/:partyType/:partyId/" element={<ProfilePage />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/edit-article/:articleId/" element={<EditArticle />} />
        <Route
          path="/message/payment/success/:paymentId?/"
          element={<SuccessfulPayment />}
        />
        <Route
          path="/message/payment/failure/:paymentId?/"
          element={<FailedPayment />}
        />
        <Route path="/receipt/:receiptId/" element={<RegistrationReceipt />} />
        <Route path="/setting/:section?/" element={<Setting />} />
        <Route path="/articles/" element={<Articles />} />
        <Route path="/program/:programSlug/fsm/:fsmId/" element={<FSM />} />
        <Route
          path="/program/:programSlug/form/"
          element={<Registration />}
        />
        <Route
          path="/program/:programSlug/team-setting/"
          element={<TeamSetting />}
        />
        <Route path="/program/:programSlug/" element={<Program />} />

        {/* only website admins can visit: */}
        <Route path="/website/:websiteName/manage/:section?/" element={<WebsiteManagement />} />

        {/* only mentors can visit: */}
        <Route path="/program/:programSlug/manage/:section?/" element={<ProgramManagement />} />
        <Route path="/program/:programSlug/fsm/:fsmId/manage/correction/:answerId/" element={<Correction />} />
        <Route path="/program/:programSlug/fsm/:fsmId/manage/:section?/" element={<FSMManagement />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Root;

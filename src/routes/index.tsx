import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ResetPassword from 'pages/ResetPassword';
import CreateAccount from 'pages/CreateAccount';
import RegistrationReceipt from 'pages/RegistrationReceipt';
import Programs from 'pages/Programs';
import Setting from 'pages/Setting';
import Program from 'pages/Program';
import ProgramManagement from 'pages/ProgramManagement';
import NotFoundPage from 'pages/Message/NotFoundPage';
import Login from 'pages/Login';
import FailedPayment from 'pages/Message/FailedPayment';
import SuccessfulPayment from 'pages/Message/SuccessfulPayment';
import Registration from 'pages/Registration';
import TeamSelection from 'pages/TeamSelection';
import FSM from 'pages/FSM';
import Article from 'pages/Article';
import Articles from 'pages/Articles';
import PrivateRoute from './PrivateRoute';
import FSMManagement from 'pages/FSMManagement';
import Correction from 'pages/Correction';
import EditArticle from 'pages/EditArticle';
import WebsiteManagement from 'pages/WebsiteManagement';
import ProfilePage from 'pages/Profile';

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
          path="/program/:programSlug/team-selection/"
          element={<TeamSelection />}
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

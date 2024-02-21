import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import AboutUs from 'pages/AboutUs';
import ResetPassword from 'pages/ResetPassword';
import CreateAccount from 'pages/CreateAccount';
import RegistrationReceipt from 'pages/RegistrationReceipt';
import Programs from 'pages/Programs';
import Profile from 'pages/Profile';
import Program from 'pages/Program';
import ProgramManagement from 'pages/ProgramManagement';
import NotFoundPage from 'pages/Message/NotFoundPage';
import Login from 'pages/Login';
import FailedPayment from 'pages/Message/FailedPayment';
import SuccessfulPayment from 'pages/Message/SuccessfulPayment';
import Registration from 'pages/Registration';
import TeamSelection from 'pages/TeamSelection';
import Workshop from 'pages/FSM';
import Article from 'pages/Article';
import Articles from 'pages/Articles';
import PrivateRoute from './PrivateRoute';
import FSMManagement from 'pages/FSMManagement';
import Correction from 'pages/Correction';
import EditArticle from 'pages/EditArticle';
import CustomPage from 'pages/CustomPage';

const Root = () => {

  return (
    <Routes>
      <Route path="/l/mr4k2309" element={<CustomPage />} ></Route>

      <Route path="/about-us/" element={<AboutUs />} />

      <Route path="/" element={<Login />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/reset-password/" element={<ResetPassword />} />
      <Route path="/create-account/" element={<CreateAccount />} />
      <Route path="/articles/" element={<Articles />} />
      <Route path="/article/:articleId/" element={<Article />} />

      <Route path="/" element={<PrivateRoute />}>

        <Route path="/edit-article/:articleId/" element={<EditArticle />} />
        <Route
          path="/message/payment/success/:paymentId?"
          element={<SuccessfulPayment />}
        />
        <Route
          path="/message/payment/failure/:paymentId?"
          element={<FailedPayment />}
        />
        <Route path="/registration-receipt/:registrationReceiptId/" element={<RegistrationReceipt />} />
        <Route path="/profile/:section/" element={<Profile />} />
        <Route path="/programs/" element={<Programs />} />
        <Route path="/articles/" element={<Articles />} />
        <Route path="/program/:programId/fsm/:fsmId/" element={<Workshop />} />
        <Route path="/program/:programId/profile/:section/" element={<Profile />} />
        <Route
          path="/program/:programId/registration/"
          element={<Registration />}
        />
        <Route
          path="/program/:programId/team-selection/"
          element={<TeamSelection />}
        />
        <Route path="/program/:programId/" element={<Program />} />

        {/* only mentors can visit: */}
        <Route path="/program/:programId/manage/:section" element={<ProgramManagement />} />
        <Route path="/program/:programId/fsm/:fsmId/manage/correction/:answerId/" element={<Correction />} />
        <Route path="/program/:programId/fsm/:fsmId/manage/:section" element={<FSMManagement />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Root;

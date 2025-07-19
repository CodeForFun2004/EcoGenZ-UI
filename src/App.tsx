// src/App.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MinimalLayout from "./layouts/MinimalLayout";

import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import BlogPage from "./pages/blog/BlogPage";
import SingleBlogPage from "./pages/single-blog/SingleBlogPage";
import ContactPage from "./pages/contact/ContactPage";
import LoginPage from "./pages/login/LoginPage";
import "./App.css";
import SignupPage from "./pages/signup/SignupPage";
import SocialFeedPage from "./pages/community/SocialFeedPage";
import NotFound from "./pages/NotFound";
import RankingPage from "./pages/ranking/RankingPage";

import MediaTextPage from "./pages/media-text/MediaTextPage";
import FloatingChatButton from "./component/chatbot/FloatingChatButton";
import OrganizationPage from "./pages/organizer/OrganizerPage";
// import { StagewiseToolbar } from "@stagewise/toolbar-react";
import ReactPlugin from "@stagewise-plugins/react";

import ParticipantPage from "./pages/organizer/ParticipantPage";

import CreateActivity from "./component/activity/CreateActivity";
import ActivityMapPage from "./pages/map/ActivityMapPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <Routes>
        {/* Layout chính có Header/Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-page" element={<AboutPage />} />
          <Route path="/blog-page" element={<BlogPage />} />
          <Route path="/activities/:id" element={<SingleBlogPage />} />
          <Route path="/contact-page" element={<ContactPage />} />
          <Route path="/social-feed-page" element={<SocialFeedPage />} />
          <Route path="/ranking-page" element={<RankingPage />} />
          <Route path="/media-text-page" element={<MediaTextPage />} />
          <Route path="/create-activity" element={<CreateActivity />} />
          <Route path="/activity-map" element={<ActivityMapPage />} />
          {/* Thêm các trang public khác vào đây */}
        </Route>

        {/* Layout tối giản không Header/Footer */}
        <Route element={<MinimalLayout />}>
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/signup-page" element={<SignupPage />} />
          <Route path="/organizer-post" element={<OrganizationPage />} />
          <Route path="/approve-participant" element={<ParticipantPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <FloatingChatButton />
      <ToastContainer />
      {/* <StagewiseToolbar config={{ plugins: [ReactPlugin] }} /> */}
    </>
  );
}

export default App;

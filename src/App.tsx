

import { Route, Routes } from 'react-router-dom'
import Footer from './component/footer/Footer'
import Header from './component/header/Header'
import AboutPage from './pages/AboutPage'

import BlogPage from './pages/BlogPage'
import SingleBlogPage from './pages/SingleBlogPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-page" element={<AboutPage />} />
        <Route path="/blog-page" element={<BlogPage />} />
        <Route path="/single-blog-page" element={<SingleBlogPage />} />
        <Route path="/contact-page" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

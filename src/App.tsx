

import { Route, Routes } from 'react-router-dom'
import Footer from './component/footer/Footer'
import Header from './component/header/Header'
import AboutPage from './pages/AboutPage'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

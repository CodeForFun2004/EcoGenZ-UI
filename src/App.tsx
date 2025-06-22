

import { Route, Routes } from 'react-router-dom'
import Footer from './component/footer/Footer'
import Header from './component/header/Header'
import AboutPage from './pages/AboutPage'

function App() {
  

  return (
    <>
    <Header/>
    <Routes>
        
        <Route path="/about-page" element={<AboutPage/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App

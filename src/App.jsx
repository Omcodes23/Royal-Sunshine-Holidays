import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import DMC from './pages/DMC'
import About from './pages/About'
import Contact from './pages/Contact'
import DomesticPackages from './pages/DomesticPackages'
import InteractiveMap from './pages/InteractiveMap'
import ShineLoader from './components/ShineLoader'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container min-h-screen bg-white transition-colors duration-300">
          <ShineLoader />
          <Navbar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dmc" element={<DMC />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/packages" element={<DomesticPackages />} />
              <Route path="/interactive-map" element={<InteractiveMap />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

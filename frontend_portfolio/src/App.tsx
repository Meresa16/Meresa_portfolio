



import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './context/ThemeContext'; // Ensure this path is correct
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
// import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Experience from './pages/Exprience';
import Footer from './components/Footer';
import Projects from './pages/Projects';

function App() {
  return (
    /* The ThemeProvider must wrap everything, including the Header */
    <ThemeProvider>
      <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300 font-sans">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        {/* Footer stays at bottom */}
        <Footer />
        <Toaster position="top-right" />

      </div>
    </ThemeProvider>
  );
}

export default App;
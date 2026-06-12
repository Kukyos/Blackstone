import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Placeholder from '@/pages/Placeholder';
import Services from '@/pages/Services';
import About from '@/pages/About';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-bs-black text-bs-bone">
      <Navbar />
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/models"   element={<Placeholder eyebrow="Our Lineup" title="Models" />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about"    element={<About />} />
            <Route path="/faq"      element={<FAQ />} />
            <Route path="/contact"  element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

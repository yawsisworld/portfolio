import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileMenu from './components/MobileMenu';
import Gallery from './pages/Gallery';
import AboutPage from './pages/AboutPage';
import { useTranslation } from 'react-i18next';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPaintingId, setCurrentPaintingId] = useState(null);
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  console.log('App render - viewMode:', viewMode, 'currentPaintingId:', currentPaintingId, 'language:', i18n.language);

  return (
    <div className={`flex min-h-screen bg-white ${isRtl ? 'flex-row-reverse' : ''}`}>
      <Sidebar
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentPaintingId={currentPaintingId}
        setCurrentPaintingId={setCurrentPaintingId}
      />
      <div
        className={`flex flex-col w-full ${isRtl ? 'md:mr-64' : 'md:ml-64'}`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="md:hidden bg-white p-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
          <h1 className={`text-2xl ${i18n.language === 'en' ? 'font-playfair' : 'font-vazirmatn'} text-gray-800`}>
            {i18n.language === 'en' ? 'Yasamin Vosoughi' : 'یاسمین وثوقی'}
          </h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-gray-800 hover:text-blue-500 transition-colors duration-200"
          >
            ☰
          </button>
        </div>
        <MobileMenu
          isOpen={menuOpen}
          toggleMenu={() => setMenuOpen(!menuOpen)}
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentPaintingId={currentPaintingId}
          setCurrentPaintingId={setCurrentPaintingId}
        />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Gallery
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  currentPaintingId={currentPaintingId}
                  setCurrentPaintingId={setCurrentPaintingId}
                />
              }
            />
            <Route
              path="/gallery/:yearRange"
              element={
                <Gallery
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  currentPaintingId={currentPaintingId}
                  setCurrentPaintingId={setCurrentPaintingId}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
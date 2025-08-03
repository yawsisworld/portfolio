import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { paintings } from '../data/paintings';
import { useParams, Link } from 'react-router-dom'; // Added Link
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

function MobileMenu({ isOpen, toggleMenu, viewMode, setViewMode, currentPaintingId, setCurrentPaintingId }) {
  const { t, i18n } = useTranslation();
  const { yearRange = 'all' } = useParams();
  const isRtl = i18n.language === 'fa';
  const yearRanges = ['all', '2018-2020', '2021-2023', '2024-2025'];

  const paintingIds = useMemo(() => {
    const filtered = yearRange === 'all'
      ? paintings
      : paintings.filter(p => p.yearRange === yearRange);
    const ids = filtered.map(p => p.id);
    console.log('MobileMenu paintingIds:', ids);
    return ids;
  }, [yearRange]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 left-0 w-full bg-white p-6 shadow-lg z-20" dir={isRtl ? 'rtl' : 'ltr'}>
      <nav className="space-y-3">
        {yearRanges.map(range => (
          <Link
            key={range}
            to={`/gallery/${range}`}
            className="block text-center text-gray-800 hover:text-blue-500 text-lg transition-colors duration-200"
            onClick={toggleMenu}
          >
            {t(range)}
          </Link>
        ))}
        <Link
          to="/about"
          className="block text-center text-gray-800 hover:text-blue-500 text-lg transition-colors duration-200"
          onClick={toggleMenu}
        >
          {t('about')}
        </Link>
      </nav>
      <div className="mt-6 space-y-3">
        <button
          onClick={() => {
            if (viewMode === 'single' && paintingIds.length > 0) {
              const currentIndex = paintingIds.indexOf(currentPaintingId);
              const prevIndex = (currentIndex - 1 + paintingIds.length) % paintingIds.length;
              setCurrentPaintingId(paintingIds[prevIndex]);
              console.log('Previous clicked (Mobile), new paintingId:', paintingIds[prevIndex], 'currentIndex:', currentIndex);
            }
            toggleMenu();
          }}
          disabled={viewMode !== 'single' || paintingIds.length === 0}
          className="block w-full text-center text-sm text-gray-800 disabled:text-gray-400 hover:text-blue-500 transition-colors duration-200"
        >
          {t('previous')}
        </button>
        <button
          onClick={() => {
            if (viewMode === 'single' && paintingIds.length > 0) {
              const currentIndex = paintingIds.indexOf(currentPaintingId);
              const nextIndex = (currentIndex + 1) % paintingIds.length;
              setCurrentPaintingId(paintingIds[nextIndex]);
              console.log('Next clicked (Mobile), new paintingId:', paintingIds[nextIndex], 'currentIndex:', currentIndex);
            }
            toggleMenu();
          }}
          disabled={viewMode !== 'single' || paintingIds.length === 0}
          className="block w-full text-center text-sm text-gray-800 disabled:text-gray-400 hover:text-blue-500 transition-colors duration-200"
        >
          {t('next')}
        </button>
        <div className={`flex items-center justify-center space-x-4 ${isRtl ? 'space-x-reverse' : ''}`}>
          <button
            onClick={() => {
              setViewMode('grid');
              console.log('View Grid clicked (Mobile), new viewMode: grid');
              toggleMenu();
            }}
            className={`text-sm px-2 py-1 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-500 hover:text-white transition-colors duration-200`}
          >
            {t('viewGrid')}
          </button>
          <button
            onClick={() => {
              const newMode = 'single';
              setViewMode(newMode);
              if (paintingIds.length > 0 && !paintingIds.includes(currentPaintingId)) {
                setCurrentPaintingId(paintingIds[0]);
                console.log('View Single clicked (Mobile), set currentPaintingId:', paintingIds[0]);
              }
              console.log('View Single clicked (Mobile), new viewMode: single');
              toggleMenu();
            }}
            className={`text-sm px-2 py-1 rounded ${viewMode === 'single' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-500 hover:text-white transition-colors duration-200`}
          >
            {t('viewSingle')}
          </button>
        </div>
        <div className={`flex justify-center space-x-8 ${isRtl ? 'space-x-reverse' : ''}`}>
          <a href="https://www.instagram.com/yawsisworld/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors duration-200" />
          </a>
          <a href="mailto:yawsisworld@gmail.com">
            <FaEnvelope className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors duration-200" />
          </a>
          <button
            onClick={() => {
              i18n.changeLanguage('en');
              toggleMenu();
              console.log('Language switched to EN (mobile)');
            }}
            className="text-sm text-gray-800 hover:text-blue-500 transition-colors duration-200"
          >
            EN
          </button>
          <button
            onClick={() => {
              i18n.changeLanguage('fa');
              toggleMenu();
              console.log('Language switched to FA (mobile)');
            }}
            className="text-sm text-gray-800 hover:text-blue-500 transition-colors duration-200"
          >
            FA
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
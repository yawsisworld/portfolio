import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { paintings } from '../data/paintings';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom'; // Added Link

function Sidebar({ viewMode, setViewMode, currentPaintingId, setCurrentPaintingId }) {
  const { t, i18n } = useTranslation();
  const { yearRange = 'all' } = useParams();
  const isRtl = i18n.language === 'fa';
  const yearRanges = ['all', '2018-2020', '2021-2023', '2024-2025'];
  const nameFont = i18n.language === 'en' ? 'font-playfair' : 'font-vazirmatn';
  const name = i18n.language === 'en' ? 'Yasamin Vosoughi' : 'یاسمین وثوقی';

  const paintingIds = useMemo(() => {
    const filtered = yearRange === 'all'
      ? paintings
      : paintings.filter(p => p.yearRange === yearRange);
    const ids = filtered.map(p => p.id);
    console.log('Sidebar paintingIds:', ids); // Debug log
    return ids;
  }, [yearRange]);

  return (
    <div
      className={`hidden md:flex w-64 bg-white p-4 h-screen flex-col justify-between fixed top-0 ${isRtl ? 'right-0' : 'left-0'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div>
        <h1 className={`text-3xl ${nameFont} ${isRtl ? 'text-right' : 'text-left'} text-gray-800`}>{name}</h1>
        <p className={`text-sm text-gray-600 ${isRtl ? 'text-right' : 'text-left'} font-vazirmatn`}>{t('paintings')}</p>
      </div>
      <div className="flex-1 flex items-center">
        <div className="w-full space-y-4">
          <nav className="space-y-2">
            {yearRanges.map(range => (
              <Link
                key={range}
                to={`/gallery/${range}`}
                className={`block ${isRtl ? 'text-right' : 'text-left'} text-gray-800 hover:text-blue-500 transition-colors duration-200`}
              >
                {t(range)}
              </Link>
            ))}
            <Link
              to="/about"
              className={`block ${isRtl ? 'text-right' : 'text-left'} text-gray-800 hover:text-blue-500 transition-colors duration-200`}
            >
              {t('about')}
            </Link>
          </nav>
          <div className="space-y-2">
            <button
              onClick={() => {
                if (viewMode === 'single' && paintingIds.length > 0) {
                  const currentIndex = paintingIds.indexOf(currentPaintingId);
                  const prevIndex = (currentIndex - 1 + paintingIds.length) % paintingIds.length;
                  setCurrentPaintingId(paintingIds[prevIndex]);
                  console.log('Previous clicked (Sidebar), new paintingId:', paintingIds[prevIndex], 'currentIndex:', currentIndex);
                }
              }}
              disabled={viewMode !== 'single' || paintingIds.length === 0}
              className={`block w-full ${isRtl ? 'text-right' : 'text-left'} text-sm text-gray-800 disabled:text-gray-400 hover:text-blue-500 transition-colors duration-200`}
            >
              {t('previous')}
            </button>
            <button
              onClick={() => {
                if (viewMode === 'single' && paintingIds.length > 0) {
                  const currentIndex = paintingIds.indexOf(currentPaintingId);
                  const nextIndex = (currentIndex + 1) % paintingIds.length;
                  setCurrentPaintingId(paintingIds[nextIndex]);
                  console.log('Next clicked (Sidebar), new paintingId:', paintingIds[nextIndex], 'currentIndex:', currentIndex);
                }
              }}
              disabled={viewMode !== 'single' || paintingIds.length === 0}
              className={`block w-full ${isRtl ? 'text-right' : 'text-left'} text-sm text-gray-800 disabled:text-gray-400 hover:text-blue-500 transition-colors duration-200`}
            >
              {t('next')}
            </button>
            <div className={`flex items-center ${isRtl ? 'justify-start space-x-4 space-x-reverse' : 'justify-end space-x-4'}`}>
              <button
                onClick={() => {
                  setViewMode('grid');
                  console.log('View Grid clicked (Sidebar), new viewMode: grid');
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
                    console.log('View Single clicked, set currentPaintingId:', paintingIds[0]);
                  }
                  console.log('View Single clicked (Sidebar), new viewMode: single');
                }}
                className={`text-sm px-2 py-1 rounded ${viewMode === 'single' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-500 hover:text-white transition-colors duration-200`}
              >
                {t('viewSingle')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`flex ${isRtl ? 'justify-start space-x-8 space-x-reverse' : 'justify-end space-x-8'} items-center`}>
        <a href="https://www.instagram.com/yawsisworld/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors duration-200" />
        </a>
        <a href="mailto:yawsisworld@gmail.com">
          <FaEnvelope className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors duration-200" />
        </a>
        <button
          onClick={() => {
            i18n.changeLanguage('en');
            console.log('Language switched to EN');
          }}
          className="text-sm text-gray-800 hover:text-blue-500 transition-colors mx-6 duration-200"
        >
          EN
        </button>
        <button
          onClick={() => {
            i18n.changeLanguage('fa');
            console.log('Language switched to FA');
          }}
          className="text-sm text-gray-800 hover:text-blue-500 transition-colors duration-200"
        >
          FA
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
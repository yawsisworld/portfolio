import PaintingFrame from './PaintingFrame';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function PaintingSingle({ painting, onPrevious, onNext }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    console.log('Image clicked, opening modal for painting:', painting?.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log('Modal closed for painting:', painting?.id);
  };

  return (
    <div
      className="relative flex justify-center items-center p-6 bg-white min-h-screen"
      role="region"
      aria-label="Painting single view"
    >
      {/* Previous Button */}
      <button
        className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer md:hover:bg-gray-100/20 md:transition-colors md:duration-200 flex items-center justify-start pl-4"
        onClick={() => {
          console.log('Previous clicked (PaintingSingle), painting id:', painting?.id);
          onPrevious();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPrevious();
          }
        }}
        aria-label="Previous painting"
        tabIndex={0}
      >
        <span className="hidden md:inline text-gray-600 text-2xl">←</span>
      </button>

      {/* Painting Frame with Click Handler */}
      <div onClick={openModal} className="cursor-pointer">
        <PaintingFrame painting={painting} size="large" />
      </div>

      {/* Next Button */}
      <button
        className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer md:hover:bg-gray-100/20 md:transition-colors md:duration-200 flex items-center justify-end pr-4"
        onClick={() => {
          console.log('Next clicked (PaintingSingle), painting id:', painting?.id);
          onNext();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onNext();
          }
        }}
        aria-label="Next painting"
        tabIndex={0}
      >
        <span className="hidden md:inline text-gray-600 text-2xl">→</span>
      </button>

      {/* Modal for Enlarged Image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          role="dialog"
          aria-label="Enlarged painting view"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
              onClick={closeModal}
              aria-label="Close enlarged view"
              tabIndex={0}
            >
              &times;
            </button>
            <img
              src={painting.imageUrl}
              alt={painting.name[lang]}
              className="w-full h-auto max-h-[90vh] object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PaintingSingle;
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function PaintingFrame({ painting, size = 'small' }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const frameClass = size === 'small' ? 'max-w-xs' : 'max-w-3xl';
  const isSingleView = size === 'large';
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`${frameClass} bg-white flex flex-col items-center`}>
      <div
        className={`${
          isSingleView
            ? 'border-6 border-gray-200 shadow-lg rounded-md'
            : 'border-4 border-gray-200 shadow-md rounded'
        } transition-transform duration-300 hover:scale-105 relative`}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="spinner"></div>
          </div>
        )}
        <img
          src={painting.imageUrl}
          alt={painting.name[lang]}
          loading="lazy"
          className={`w-full h-auto object-cover rounded ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
          onError={() => setIsLoading(false)}
        />
      </div>
      <div
        className={`mt-4 text-center text-white space-y-1 bg-gray-600 p-4 rounded-md shadow-sm max-w-md w-full`}
      >
        <p className="font-semibold text-base">{painting.name[lang]}</p>
        <p className="text-sm">{painting.dimensions[lang]}</p>
        <p className="text-sm">{painting.materials[lang]}</p>
        <p className="text-sm">{painting.year}</p>
      </div>
    </div>
  );
}

export default PaintingFrame;
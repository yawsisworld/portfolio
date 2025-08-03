import PaintingFrame from './PaintingFrame';

function PaintingSingle({ painting, onPrevious, onNext }) {
  return (
    <div className="relative flex justify-center items-center p-6 bg-white min-h-screen">
      <div
        className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer hover:bg-gray-100/20 transition-colors duration-200 flex items-center justify-start pl-4"
        onClick={() => {
          console.log('Previous clicked (PaintingSingle), painting id:', painting?.id);
          onPrevious();
        }}
        aria-label="Previous painting"
      >
        <span className="text-gray-600 text-2xl"></span>
      </div>
      <PaintingFrame painting={painting} size="large" />
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer hover:bg-gray-100/20 transition-colors duration-200 flex items-center justify-end pr-4"
        onClick={() => {
          console.log('Next clicked (PaintingSingle), painting id:', painting?.id);
          onNext();
        }}
        aria-label="Next painting"
      >
        <span className="text-gray-600 text-2xl"></span>
      </div>
    </div>
  );
}

export default PaintingSingle;
import PaintingFrame from './PaintingFrame';

function PaintingGrid({ paintings, onSelectPainting }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 bg-white max-w-7xl mx-auto">
      {paintings.map(painting => (
        <div
          key={painting.id}
          onClick={() => onSelectPainting(painting.id)}
          className="cursor-pointer flex justify-center"
        >
          <PaintingFrame painting={painting} size="small" />
        </div>
      ))}
    </div>
  );
}

export default PaintingGrid;
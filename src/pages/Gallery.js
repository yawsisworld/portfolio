import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { paintings } from '../data/paintings';
import PaintingGrid from '../components/PaintingGrid';
import PaintingSingle from '../components/PaintingSingle';

function Gallery({ viewMode, setViewMode, currentPaintingId, setCurrentPaintingId }) {
  const { yearRange = 'all' } = useParams();

  // Memoize filteredPaintings and paintingIds
  const filteredPaintings = useMemo(() => {
    const filtered = yearRange === 'all'
      ? paintings
      : paintings.filter(p => p.yearRange === yearRange);
    console.log('Filtered paintings:', filtered); // Debug log
    return filtered;
  }, [yearRange]);

  const paintingIds = useMemo(() => {
    const ids = filteredPaintings.map(p => p.id);
    console.log('Painting IDs:', ids); // Debug log
    return ids;
  }, [filteredPaintings]);

  useEffect(() => {
    console.log('Gallery useEffect - yearRange:', yearRange, 'viewMode:', viewMode, 'currentPaintingId:', currentPaintingId);
    // Reset currentPaintingId if not valid for current yearRange
    if (!paintingIds.includes(currentPaintingId) && paintingIds.length > 0) {
      setCurrentPaintingId(paintingIds[0]);
      console.log('Reset currentPaintingId to:', paintingIds[0]);
    } else if (paintingIds.length === 0) {
      setCurrentPaintingId(null);
      console.log('No paintings available, set currentPaintingId to null');
    }
  }, [yearRange, paintingIds, currentPaintingId, setCurrentPaintingId, viewMode]); // Added viewMode

  const currentPainting = filteredPaintings.find(p => p.id === currentPaintingId) || (paintingIds.length > 0 ? filteredPaintings[0] : null);

  if (!currentPainting && viewMode === 'single') {
    console.log('No painting available for single view, switching to grid');
    setViewMode('grid');
  }

  return (
    <div className="bg-white min-h-screen">
      {viewMode === 'grid' || !currentPainting ? (
        <PaintingGrid
          paintings={filteredPaintings}
          onSelectPainting={id => {
            console.log('Selected painting ID:', id);
            setCurrentPaintingId(id);
            setViewMode('single');
          }}
        />
      ) : (
        <PaintingSingle
          painting={currentPainting}
          onPrevious={() => {
            if (paintingIds.length > 0) {
              const currentIndex = paintingIds.indexOf(currentPaintingId);
              const prevIndex = (currentIndex - 1 + paintingIds.length) % paintingIds.length;
              setCurrentPaintingId(paintingIds[prevIndex]);
              console.log('Previous painting ID (single view):', paintingIds[prevIndex]);
            }
          }}
          onNext={() => {
            if (paintingIds.length > 0) {
              const currentIndex = paintingIds.indexOf(currentPaintingId);
              const nextIndex = (currentIndex + 1) % paintingIds.length;
              setCurrentPaintingId(paintingIds[nextIndex]);
              console.log('Next painting ID (single view):', paintingIds[nextIndex]);
            }
          }}
        />
      )}
    </div>
  );
}

export default Gallery;
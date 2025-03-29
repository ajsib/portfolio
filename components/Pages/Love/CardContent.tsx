import React, { useEffect, useState } from 'react';

// Define TypeScript interfaces for our data
interface ImageLayout {
  id: number;
  src: string;
  aspectRatio: number;
  width: number;
}

interface Letter {
  title: string;
  content: string;
  author: string;
  images?: string[];
}

interface CardContentProps {
  datestamp: string;
  onBack: () => void;
}

const CardContent: React.FC<CardContentProps> = ({
  datestamp,
  onBack,
}) => {
  const [letter, setLetter] = useState<Letter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageLayout, setImageLayout] = useState<ImageLayout[]>([]);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  const fetchLetter = async (): Promise<void> => {
    try {
      const res = await fetch(`/api/letters/getByStamp?datestamp=${datestamp}`);
      const data = await res.json();
      setLetter(data);
      setLoading(false);
      
      if (data && data.images && data.images.length > 0) {
        loadImageDimensions(data.images);
      }
    } catch (error) {
      console.error("Error fetching letter:", error);
      setLoading(false);
    }
  };

  // Preload images and calculate aspect ratios
  const loadImageDimensions = (images: string[]): void => {
    const imagePromises = images.map((src, index) => {
      return new Promise<ImageLayout>((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            id: index,
            src: src,
            aspectRatio: img.height / img.width,
            width: 0 // Will be calculated later
          });
        };
        img.onerror = () => {
          // Default to square aspect ratio if image fails to load
          resolve({
            id: index,
            src: src,
            aspectRatio: 1,
            width: 0
          });
        };
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(layoutItems => {
      setImageLayout(layoutItems);
      setImagesLoaded(true);
    });
  };

  // Calculate optimal layout with justified rows
  useEffect(() => {
    if (!imagesLoaded || imageLayout.length === 0) return;
    
    const containerWidth = document.querySelector('.pinterest-gallery')?.clientWidth || 600;
    const targetRowHeight = 250; // Base row height
    const gapSize = 10; // Gap between images
    
    // Clone the array to avoid modifying state directly
    const layoutCalculation = [...imageLayout];
    
    // Calculate widths based on target height and aspect ratio
    layoutCalculation.forEach(item => {
      item.width = Math.floor(targetRowHeight / item.aspectRatio);
    });
    
    setImageLayout(layoutCalculation);
    
  }, [imagesLoaded, imageLayout.length]);

  useEffect(() => {
    fetchLetter();
    
    // Clean up event listener on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [datestamp]);

  const openFullscreenImage = (src: string): void => {
    setFullscreenImage(src);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreenImage = (): void => {
    setFullscreenImage(null);
    document.body.style.overflow = 'auto';
  };

  const downloadImage = (src: string): void => {
    const link = document.createElement('a');
    link.href = src;
    const filename = src.split('/').pop() || `memory-${new Date().getTime()}.jpg`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleKeyDown = (e: React.KeyboardEvent | KeyboardEvent): void => {
    if (e.key === 'Escape' && fullscreenImage) {
      closeFullscreenImage();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullscreenImage]);

  if (loading) return <div className="letter-loading">Loading letter...</div>;
  if (!letter) return <div className="letter-not-found">Letter not found.</div>;

  return (
    <>
      <div className="letter-display">
        <div className="back-button" onClick={onBack}>
          ← Back to All Letters
        </div>
        
        <div className="letter-header">
          <h2>{letter.title}</h2>
          <div className="letter-date">{new Date(datestamp).toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric'
          })}</div>
        </div>

        <div className="letter-content">
          {letter.content.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        
        <div className="letter-signature">
          <span className="signature-dash">—</span> {letter.author}
        </div>

        {letter.images && letter.images.length > 0 && (
          <div className="image-gallery-container">
            <h3 className="gallery-title">Our Memories</h3>
            <div className="pinterest-gallery">
              {imageLayout.map((img) => (
                <div 
                  key={img.id} 
                  className="gallery-item"
                  style={{ 
                    flexBasis: `${img.width}px`,
                    flexGrow: img.width
                  }}
                  onClick={() => openFullscreenImage(img.src)}
                >
                  <div className="img-wrapper" style={{ paddingBottom: `${img.aspectRatio * 100}%` }}>
                    <img src={img.src} alt={`Shared memory ${img.id + 1}`} />
                  </div>
                  <div className="image-overlay">
                    <div className="overlay-icon">👁️</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fullscreen Image Viewer */}
        {fullscreenImage && (
          <div 
            className="fullscreen-overlay" 
            onClick={closeFullscreenImage}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
              <img src={fullscreenImage} alt="Fullscreen view" />
              <div className="fullscreen-controls">
                <button className="control-button download-button" onClick={() => downloadImage(fullscreenImage)}>
                  Download
                </button>
                <button className="control-button close-button" onClick={closeFullscreenImage}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .letter-loading,
          .letter-not-found {
            text-align: center;
            padding: 2rem;
            color: #886868;
            font-style: italic;
          }

          .letter-display {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            max-width: 800px;
            width: 100%;
            box-shadow: 0 2px 20px rgba(0,0,0,0.08);
            font-family: 'Segoe UI', 'Helvetica', sans-serif;
            position: relative;
            overflow: hidden;
            margin-bottom: 2rem;
            height: auto;
            min-height: 300px;
          }

          .back-button {
            display: inline-block;
            margin-bottom: 1.5rem;
            cursor: pointer;
            color: #d67979;
            font-weight: 600;
            transition: all 0.2s ease;
            padding: 0.5rem 0;
          }

          .back-button:hover {
            color: #c56565;
          }

          .letter-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .letter-header h2 {
            font-family: 'Georgia', 'Times New Roman', serif;
            color: #555;
            font-size: 1.8rem;
            margin: 0;
            font-weight: normal;
          }

          .letter-date {
            font-style: italic;
            color: #886868;
            font-size: 0.9rem;
            margin-top: 0.5rem;
          }

          .letter-content {
            padding: 0 0.5rem;
            margin-bottom: 2rem;
            line-height: 1.6;
            color: #444;
          }

          .letter-content p {
            margin-bottom: 1rem;
          }

          .letter-signature {
            text-align: right;
            font-weight: 600;
            color: #555;
            font-size: 1.1rem;
            margin: 2rem 1rem 1rem 0;
            font-family: 'Georgia', 'Times New Roman', serif;
          }

          .signature-dash {
            color: #d67979;
            margin-right: 0.5rem;
          }

          .image-gallery-container {
            margin-top: 2.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(232, 212, 212, 0.7);
          }

          .gallery-title {
            text-align: center;
            font-family: 'Georgia', 'Times New Roman', serif;
            color: #555;
            font-size: 1.3rem;
            margin: 0 0 1.5rem 0;
            font-weight: normal;
          }

          /* Pinterest-style gallery */
          .pinterest-gallery {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            margin-bottom: 10px;
          }

          .gallery-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
          }

          .img-wrapper {
            position: relative;
            width: 100%;
            overflow: hidden;
          }

          .gallery-item img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.5s ease;
          }

          .gallery-item:hover img {
            transform: scale(1.05);
          }

          .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .overlay-icon {
            background-color: rgba(255, 255, 255, 0.9);
            color: #d67979;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transform: translateY(10px);
            opacity: 0;
            transition: all 0.3s ease;
          }

          .gallery-item:hover .image-overlay {
            opacity: 1;
          }

          .gallery-item:hover .overlay-icon {
            transform: translateY(0);
            opacity: 1;
          }

          /* Fullscreen Image Viewer */
          .fullscreen-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .fullscreen-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
          }

          .fullscreen-content img {
            max-width: 100%;
            max-height: 85vh;
            object-fit: contain;
            border-radius: 4px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
          }

          .fullscreen-controls {
            position: absolute;
            bottom: -60px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 15px;
          }

          .control-button {
            padding: 10px 20px;
            border-radius: 50px;
            background-color: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .control-button:hover {
            background-color: rgba(255, 255, 255, 0.3);
          }

          .close-button {
            background-color: rgba(220, 100, 100, 0.6);
          }

          .close-button:hover {
            background-color: rgba(220, 100, 100, 0.8);
          }

          .download-button {
            background-color: rgba(100, 160, 220, 0.6);
          }

          .download-button:hover {
            background-color: rgba(100, 160, 220, 0.8);
          }

          /* Responsive adjustments */
          @media (max-width: 600px) {
            .letter-display {
              padding: 1.5rem;
              border-radius: 12px;
            }

            .letter-header h2 {
              font-size: 1.5rem;
            }
            
            .fullscreen-controls {
              bottom: -50px;
            }
            
            .control-button {
              padding: 8px 16px;
              font-size: 0.9rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default CardContent;
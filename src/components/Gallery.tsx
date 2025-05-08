// Gallery.tsx

import React, { useState, useEffect } from 'react';
import Dexie from 'dexie';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Upload, Video, Trash2 } from 'lucide-react';

type MediaItem = {
  id?: number;   // for Dexie primary key
  dataUrl: string;
  caption: string;
  type: 'image' | 'video';
};

// Setup Dexie DB
class GalleryDB extends Dexie {
  media!: Dexie.Table<MediaItem, number>;
  constructor() {
    super('galleryDB');
    this.version(1).stores({
      media: '++id, caption, type',
    });
  }
}

const db = new GalleryDB();

const Gallery: React.FC = () => {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load media from IndexedDB on mount
  useEffect(() => {
    const loadMedia = async () => {
      const allMedia = await db.media.toArray();
      setImages(allMedia);
    };
    loadMedia();
  }, []);

  const refreshMedia = async () => {
    const allMedia = await db.media.toArray();
    setImages(allMedia);
  };

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  const openModal = (index: number) => {
    if (images.length > 0) {
      setCurrentIndex(index);
      setIsModalOpen(true);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const readers = fileArray.map(file => {
        return new Promise<MediaItem>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              dataUrl: reader.result as string,
              caption: file.name,
              type
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const newMedia = await Promise.all(readers);
      await db.media.bulkAdd(newMedia);
      refreshMedia();
    }
  };

  const handleDelete = async (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const itemToDelete = images[index];
    if (itemToDelete.id !== undefined) {
      await db.media.delete(itemToDelete.id);
      await refreshMedia();

      if (isModalOpen) {
        if (images.length - 1 === 0) {
          setIsModalOpen(false);
        } else if (index >= images.length - 1) {
          setCurrentIndex(Math.max(0, images.length - 2));
        }
      }
    }
  };

  return (
    <section id="gallery" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ImageIcon className="h-12 w-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Memories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A collection of our favorite moments together. Each picture tells a story of laughter, adventure, and friendship.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <label className="cursor-pointer inline-flex items-center bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors">
              <Upload className="mr-2 h-5 w-5" />
              Add Photos
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'image')}
              />
            </label>
            <label className="cursor-pointer inline-flex items-center bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition-colors">
              <Video className="mr-2 h-5 w-5" />
              Add Videos
              <input
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'video')}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((media, index) => (
            <div
              key={media.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openModal(index)}
            >
              <div className="aspect-w-3 aspect-h-2">
                {media.type === 'video' ? (
                  <video
                    src={media.dataUrl}
                    className="object-cover w-full h-full"
                    controls
                  />
                ) : (
                  <img
                    src={media.dataUrl}
                    alt={`Memory ${index + 1}`}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium">{media.caption}</p>
                </div>
                <button
                  onClick={(e) => handleDelete(index, e)}
                  className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/30 hover:bg-black/50"
            onClick={prevImage}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="max-w-4xl max-h-[80vh] relative">
            {images[currentIndex].type === 'video' ? (
              <video
                src={images[currentIndex].dataUrl}
                className="max-h-[80vh] max-w-full h-auto"
                controls
                autoPlay
              />
            ) : (
              <img
                src={images[currentIndex].dataUrl}
                alt={`Full size ${currentIndex + 1}`}
                className="max-h-[80vh] max-w-full h-auto object-contain"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white text-center flex justify-between items-center">
              <span>{images[currentIndex].caption}</span>
              <button
                onClick={(e) => handleDelete(currentIndex, e)}
                className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/30 hover:bg-black/50"
            onClick={nextImage}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;

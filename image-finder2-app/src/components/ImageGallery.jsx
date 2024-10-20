import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images, onImageClick }) => (
  <ul className="gallery">
    {images.map((image) => (
      <ImageGalleryItem key={image.id} image={image} onImageClick={onImageClick} />
    ))}
  </ul>
);

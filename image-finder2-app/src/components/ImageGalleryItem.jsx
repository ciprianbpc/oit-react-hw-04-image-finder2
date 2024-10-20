export const ImageGalleryItem = ({ image, onImageClick }) => (
  <li className="gallery-item" onClick={() => onImageClick(image.largeImageURL)}>
    <img src={image.webformatURL} alt={image.tags} className="gallery-image" />
  </li>
);

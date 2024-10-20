import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importă stilurile

function App() {
  const [images, setImages] = useState([]);  // Stocarea imaginilor
  const [query, setQuery] = useState('');    // Cuvântul de căutare
  const [page, setPage] = useState(1);       // Pagina curentă
  const [loading, setLoading] = useState(false); // Starea de încărcare
  const [error, setError] = useState(null);  // Starea pentru erori
  const [modalImage, setModalImage] = useState(null); // Imaginea pentru modal

  const API_KEY = `46612646-14accbebc700fc522b7fccfe4`;  // Înlocuiește cu cheia ta de la Pixabay

  // Funție care face fetch la imaginile de pe Pixabay
  const fetchImages = async () => {
    if (query.trim() === '') return; // Previne cererea dacă nu există cuvânt de căutare
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=46612646-14accbebc700fc522b7fccfe4&image_type=photo&orientation=horizontal&per_page=12`
      );
      if (response.data.hits.length === 0) {
        setError('No images found');
      } else {
        setImages(prevImages => [...prevImages, ...response.data.hits]); // Adăugăm imaginile la lista existentă
      }
    } catch (error) {
      setError('Error fetching the images');
      console.error(error);
    } finally {
      setLoading(false); // Termină încărcarea
    }
  };

  // Folosim useEffect pentru fetch-ul inițial și la schimbarea paginii
  useEffect(() => {
    fetchImages();
  });

  // Funcție pentru a trimite cererea de căutare
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setImages([]);   // Resetăm imaginile existente pentru noua căutare
    setPage(1);      // Resetăm pagina la 1
    fetchImages();   // Facem cererea de imagini
  };

  // Funcție pentru a încărca mai multe imagini
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1); // Crește numărul paginii
  };

  // Funcție pentru a deschide modalul cu imaginea mare
  const openModal = (largeImageURL) => {
    setModalImage(largeImageURL);
  };

  // Funcție pentru a închide modalul
  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="App">
      <h1>Image Search App</h1>

      {/* Searchbar - Form pentru a trimite cererea de căutare */}
      <form onSubmit={handleSearchSubmit} className="searchbar">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for images" 
          className="input" 
        />
        <button type="submit" className="button">Search</button>
      </form>

      {/* Afișarea imaginilor */}
      <ul className="gallery">
        {images.map(image => (
          <li key={image.id} className="gallery-item" onClick={() => openModal(image.largeImageURL)}>
            <img src={image.webformatURL} alt={image.tags} />
          </li>
        ))}
      </ul>

      {/* Loader pentru afișarea stării de încărcare */}
      {loading && <div className="loader">Loading...</div>}

      {/* Afișare eroare, dacă apare */}
      {error && <div className="error">{error}</div>}

      {/* Buton pentru a încărca mai multe imagini */}
      {images.length > 0 && !loading && (
        <button onClick={handleLoadMore} className="button-load-more">
          Load More
        </button>
      )}

      {/* Modal pentru afișarea imaginii mari */}
      {modalImage && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal">
            <img src={modalImage} alt="Large View" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState('english'); // Default language is English

  useEffect(() => {
    fetchPokemon();
  }, [currentPage, language]); // Fetch data whenever currentPage or language changes

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`);
      const data = await response.json();
      setPokemonList(data.data);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <div className="pokedex">
      <div className="language-buttons">
        <button onClick={() => handleLanguageChange('english')} className={language === 'english' ? 'active' : ''}>English</button>
        <button onClick={() => handleLanguageChange('japanese')} className={language === 'japanese' ? 'active' : ''}>Japanese</button>
        <button onClick={() => handleLanguageChange('chinese')} className={language === 'chinese' ? 'active' : ''}>Chinese</button>
        <button onClick={() => handleLanguageChange('french')} className={language === 'french' ? 'active' : ''}>French</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                {index + 1}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
          {pokemonList.map(pokemon => (
            <Pokemon key={pokemon.id} pokemon={pokemon} language={language} />
          ))}
          <p>Page {currentPage} of {totalPages}</p>
        </>
      )}
    </div>
  );
};

export default Pokedex;





import React from 'react';

const Pokemon = ({ pokemon, language }) => {
  let displayName;
  switch (language) {
    case 'japanese':
      displayName = pokemon.name.japanese;
      break;
    case 'chinese':
      displayName = pokemon.name.chinese;
      break;
    case 'french':
      displayName = pokemon.name.french;
      break;
    default:
      displayName = pokemon.name.english;
      break;
  }

  return (
    <div className="pokemon">
      <img src={pokemon.image} alt={displayName} />
      <p>ID: {pokemon.id}</p>
      <p>Name: {displayName}</p>
    </div>
  );
};

export default Pokemon;



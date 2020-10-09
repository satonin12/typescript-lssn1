import React from 'react';
import './App.css';

import PokemonSearch from './component/PokemonSearch';

function App() {
  return (
    <div className="App">
      <PokemonSearch name="John" numberOfPokemons={5} />
    </div>
  );
}

export default App;

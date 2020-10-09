import React, { useState } from 'react';

interface User {
  name: string;
  numberOfPokemons?: number;
}

interface SearchState {
  name: string;
  numberOfAbilities: number;
  baseExperience: number;
  imageUrl: string;
  error: boolean;
}

const PokemonSearch = ({
  name,
  numberOfPokemons,
}: User ) => {

  const [state, setState] = useState<SearchState>({
    name: '',
    numberOfAbilities: 0,
    baseExperience: 0,
    imageUrl: '',
    error: false
  });

  const pokemonRef = React.useRef<HTMLInputElement>();

  const onSearchClick = () => {
    const inputValue = pokemonRef.current.value;
    console.log(inputValue);
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
      .then(res => {
        if(res.status !== 200) {

          setState((prevState) => ({
            error: prevState.error = true
          }) as Pick<SearchState, keyof SearchState>);
          console.log({state: state});
          return;
        }
        res.json().then(data => {
          setState((prevState) => ({
            error: prevState.error = false,
            name: prevState.name = data.name,
            numberOfAbilities: prevState.numberOfAbilities = data.abilities.length,
            baseExperience: prevState.baseExperience = data.base_experience,
            imageUrl: prevState.imageUrl = data.sprites.front_default
          }));
        })
          console.log({state: state});
      })
  }

  let resultMarkup;

  if(state.error){
    resultMarkup = <p>Pokemon not found, lease try again</p>
  }else{
    resultMarkup = <div>
      <img src={state.imageUrl} alt=""/>
      <p>
        {state.name} hase {state.numberOfAbilities} abilities and {state.baseExperience} base experience points
      </p>
    </div>
  }

  return(
  <div>
    <p>
    Hello {name} and you have
    {numberOfPokemons && <span> has {numberOfPokemons} all !</span>}
    </p>
    <input type="text" ref={pokemonRef} />
    <button onClick={onSearchClick} className="button">Search</button>
    {resultMarkup}
  </div>
  );
}

export default PokemonSearch

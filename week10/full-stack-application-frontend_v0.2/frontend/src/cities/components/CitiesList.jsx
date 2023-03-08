import React from "react";

import CityItem from './CityItem';

import './CitiesList.css';

const CitiesList = props => {
  return <ul className="cities-list">
    {props.items.map(city => 
      <CityItem 
        key={city.id}
        capital={city.capital}
        country={city.country}
        image={city.image}
      />
    )}
    </ul>
};

export default CitiesList;